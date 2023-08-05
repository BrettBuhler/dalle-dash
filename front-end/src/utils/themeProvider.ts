class Theme  {
    dark: string
    mid_dark: string
    mid_light: string
    light: string

    constructor(dark: boolean){
        switch(dark){
            case true:
                this.dark = "331D2C"
                this.mid_dark = "3F2E3E"
                this.mid_light = "A78295"
                this.light = "EFE1D1"
                break
            case false:
                this.dark = "C58940"
                this.mid_dark = "E5BA73"
                this.mid_light = "FAEAB1"
                this.light = "FAF8F1"
        }
    }
}

export default Theme