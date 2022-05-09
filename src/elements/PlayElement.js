export class PlayElement{
    #elements;

    setUp(){
        this.#findElements();
        this.#bindInteractions();
    }

    #findElements(){
        this.#elements = document.querySelectorAll('.amplitude-play');
    }

    #bindInteractions(){
        // console.log( this.#elements );
    }
}