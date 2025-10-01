export class KeyBindingEvents{
    bind(){
        this.#bindKeyPress();
    }

    #bindKeyPress(){
        document.removeEventListener( "keydown", this.#handle.bind(this) );
        document.addEventListener( "keydown", this.#handle.bind(this) );
    }

    #handle( event ){
        if( !this.#isFormFocused() ){
            let key = event.key;
            
            
        }
    }

    #isFormFocused(){
        let activeElement = document.activeElement.tagName.toLowerCase();

        let ignoredElements = [
            'input',
            'textarea',
            'select'
        ];

        return ignoredElements.indexOf( activeElement ) > -1;
    }
}