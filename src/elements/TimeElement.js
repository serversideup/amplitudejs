import { GlobalCurrentTimeElement } from "./TimeElements/CurrentTime/GlobalCurrentTimeElement";
import { CollectionCurrentTimeElement } from "./TimeElements/CurrentTime/CollectionCurrentTimeElement";
import { AudioCurrentTimeElement } from "./TimeElements/CurrentTime/AudioCurrentTimeElement";
import { CollectionAudioCurrentTimeElement } from "./TimeElements/CurrentTime/CollectionAudioCurrentTimeElement";

import { GlobalDurationElement } from "./TimeElements/Duration/GlobalDurationElement";
import { CollectionDurationElement } from "./TimeElements/Duration/CollectionDurationElement";
import { AudioDurationElement } from "./TimeElements/Duration/AudioDurationElement";
import { CollectionAudioDurationElement } from "./TimeElements/Duration/CollectionAudioDurationElement";

export class TimeElement {
    syncCurrentTime( currentTime ){
        let globalCurrentTimeElement = new GlobalCurrentTimeElement( currentTime );
        globalCurrentTimeElement.sync();

        let audioCurrentTimeElement = new AudioCurrentTimeElement( currentTime );
        audioCurrentTimeElement.sync();
    }

    syncDurationTime(){

    }

    resetDurationTime(){

    }
}