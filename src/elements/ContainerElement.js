import { AudioContainerElement } from "./ContainerElements/AudioContainerElement";
import { CollectionAudioContainerElement } from "./ContainerElements/CollectionAudioContainerElement";

export class ContainerElement{
    static containerElementQuery = '.amplitude-audio-container';

    setActiveContainers( direct ){
        this.#setActiveAudioContainers();
        this.#setActiveCollectionAudioContainers( direct );
    }

    #setActiveAudioContainers(){
        let audioContainerElements = new AudioContainerElement();
        audioContainerElements.setActive();
    }

    #setActiveCollectionAudioContainers( direct ){
        let collectionAudioContainerElements = new CollectionAudioContainerElement( direct );
        collectionAudioContainerElements.setActive();
    }
}