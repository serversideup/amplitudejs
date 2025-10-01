import { GlobalBufferedProgressElement } from "./BufferedProgressElements/GlobalBufferedProgressElement";
import { CollectionBufferedProgressElement } from "./BufferedProgressElements/CollectionBufferedProgressElement";
import { CollectionAudioBufferedProgressElement } from './BufferedProgressElements/CollectionAudioBufferedProgressElement';
import { AudioBufferedProgressElement } from "./BufferedProgressElements/AudioBufferedProgressElement";

export class BufferedProgressElement{
    static syncAll(){
        GlobalBufferedProgressElement.syncUI();
        CollectionBufferedProgressElement.syncUI();
        AudioBufferedProgressElement.syncUI();
        CollectionAudioBufferedProgressElement.syncUI();
    }
}