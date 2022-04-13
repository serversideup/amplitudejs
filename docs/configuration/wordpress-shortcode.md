# Wordpress shortcode example

Here is an example Wordpress shortcode file, which can be included in a `functions.php`. 

The shortcode can then be used in a Classic Wordpress page, or Gutenberg shortcode block. This example also has a 'style' parameter for the shortcode, which gets the track data from different Wordpress post types. Each track can have up to three lines in the player. A fairly minimal AmplitudeJS player is used here, but with more data images for each track or album is possible. 

ACF was used to add custom meta data to Audio media, and playlist were added to custom post types with ACF providing more detail about each track.


```
<?php

//[tcc_audioplayer]
function tcc_audioplayer_func($atts)
{
    $amplitude_js_file_uri = get_template_directory_uri() . '/assets/js/amplitude.min.js';

    wp_enqueue_script("tcc_amplitude_js", $amplitude_js_file_uri, array('jquery'), '5.3.2', true);

    $songs = array();
    $to_return = '';
    $short = "";
    if (isset($atts['style']) && $atts['style'] == 'piece') {
        $tracks = get_field('tracks', $atts['post_id']);
        if ($tracks) {
            $track_ids = array();
            foreach ($tracks as $track) {
                $track_ids[] = $track['audio_media_id'];
            }

            $play_list_details = get_playlist_db_details($track_ids, 'piece');
            $songs = get_songs_from_playlist_details($play_list_details);
        }
    }

    if (isset($atts['style']) && $atts['style'] == 'recording') {
        $tracks = get_field('clips', $atts['post_id']);
        if ($tracks) {
            foreach ($tracks as $track) {
                if ($track['clip']) {
                    $song = array();
                    $song['url'] = $track['clip']['url'];
                    $song['name'] = $track['clip']['title'];
                    $songs[] = $song;
                }
            }
        }
    }

    if (isset($atts['style']) && $atts['style'] == 'album') {
        $tracks = get_field('playlist', $atts['post_id']);
        if ($tracks) {
            $track_ids = array();
            foreach ($tracks as $track) {
                $track_ids[] = $track['audio_file']['id'];
            }

            $play_list_details = get_playlist_db_details($track_ids, 'album');
            $songs = get_songs_from_playlist_details($play_list_details);
            $order = array();

            // bail early if no value
            if( empty($songs) ) {
                return $songs;
            }

            // populate order
            foreach( $songs as $i => $row ) {
                $file_url = $row['url'];
                $order[ $i ] = $file_url;
            }

            // multisort
            array_multisort( $order, SORT_ASC, $songs );
        }
    }

    if (count($songs) > 0) {

        $to_return .= <<<EOD

<!-- Blue Playlist Container -->
<div id="blue-playlist-container">

    <!-- Amplitude Player -->
    <div id="amplitude-player">

        <!-- Left Side Player -->
        <div id="amplitude-left">
            <div id="player-left-bottom">
            
                <div id="time-container">	          
                    <div id="controls-container">         
                        <span class="amplitude-play-pause" id="play-pause"></span>
                    </div> 
                    <span class="current-time">
                        <span class="amplitude-current-minutes"></span>:<span
                              class="amplitude-current-seconds"></span>
                    </span>
                    <div id="progress-container">
                        <input class="amplitude-song-slider" type="range"/>
                        <progress class="amplitude-song-played-progress" id="song-played-progress"></progress>
                        <progress class="amplitude-buffered-progress" id="song-buffered-progress" value="0"></progress>
                    </div>
                    <span class="duration">
                        <span class="amplitude-duration-minutes"></span>:<span
                              class="amplitude-duration-seconds"></span>
                    </span>
                </div>
            </div>
        </div>
        <!-- End Left Side Player -->

        <!-- Right Side Player -->
        <div id="amplitude-right">
EOD;

        foreach ($songs as $index => $song) {
            $to_return .= "        
            <div class=\"song amplitude-song-container amplitude-play-pause\" data-amplitude-song-index=\"" . $index . "\">
                <div class=\"song-now-playing-icon$short-container\">
                    <div class=\"play-button-container\"></div>
                    <img class=\"now-playing$short\"
                         src=\"/wp-content/themes/trinitychoir/assets/images/now-playing.svg\" alt=\"now playing\" />
                </div>
                <div class=\"song-meta-data\">";
            if (array_key_exists('name', $song)) {
                $to_return .= "<span class=\"song-title\">" . $song['name'] . "</span>";
            } else {
                $to_return .= "<span class=\"song-title\">&nbsp;</span>";
            }
            if (array_key_exists('artist', $song)) {
                $to_return .= "<span class=\"song-artist\">" . $song['artist'] . "</span>";
            }else {
                $to_return .= "<span class=\"song-artist\">&nbsp;</span>";
            }
            if (array_key_exists('album', $song)) {
                $to_return .= "<span class=\"song-album\">" . $song['album'] . "</span>";
            }else {
                $to_return .= "<span class=\"song-album\">&nbsp;</span>";
            }
            $to_return .= "
                </div>
            </div>";
        }

        $to_return .= <<<EOD
        </div>
        <!-- End Right Side Player -->
    </div>
    <!-- End Amplitude Player -->
</div>
EOD;

        $to_return .= '<script>
        var tcc_audioplayer_album_tracks = ' . json_encode($songs) . ';

        jQuery(document).ready(function($) {
            Amplitude.init({
                "songs": tcc_audioplayer_album_tracks,
            });
        });
        </script>';
    }

    return $to_return;
}

add_shortcode('tcc_audioplayer', 'tcc_audioplayer_func');

```
