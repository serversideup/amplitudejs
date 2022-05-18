## Volume Up Element

### Overview
The volume up element increases the global volume level of AmplitudeJS by the amount defined. This amount is an integer value between `0` and `100` with `0` being muted, and `100` as maximum. As a safe default, the increment value is set to `5` which means that on click/touch the volume will increment 5%.

### Creating a Volume Up Element

### Related Configuration Variables
Default `5`

`config.volume.increment`

On init:
Amplitude.init({
    volume: {
        increment: 5
    }
})

### Notes
Does not work on iOS
