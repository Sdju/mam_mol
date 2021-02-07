namespace $.$$ {

	export class $mol_link_iconed extends $.$mol_link_iconed {

		icon() {
			return `https://favicon.yandex.net/favicon/${ this.host() }?color=0,0,0,0&size=32&stub=1`
		}

		@ $mol_mem
		host() {
			const url = new URL( this.uri() )
			return url.hostname
		}
		
		@ $mol_mem
		title() {
			return decodeURIComponent( this.uri().split( this.host() , 2 )[1] )
		}

		sub() {
			return [
				... this.host() ? [ this.Icon() ] : [],
				... this.content(),
			]
		}

	}

}
