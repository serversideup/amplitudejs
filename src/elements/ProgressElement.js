import { GlobalProgressElement } from "./ProgressElements/GlobalProgressElement";
import { CollectionProgressElement } from "./ProgressElements/CollectionProgressElement";
import { AudioProgressElement } from "./ProgressElements/AudioProgressElement";
import { CollectionAudioProgressElement } from "./ProgressElements/CollectionAudioProgressElement";

export class ProgressElement{
    constructor(){

    }

    static syncCurrentTime( percentage ){
        GlobalProgressElement.syncUI( percentage );
        CollectionProgressElement.syncUI( percentage );
        AudioProgressElement.syncUI( percentage );
        CollectionAudioProgressElement.syncUI( percentage );
    }
}