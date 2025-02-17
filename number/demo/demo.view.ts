namespace $.$$ {
	export class $mol_number_demo extends $.$mol_number_demo {
		@ $mol_mem
		override value_string() : string {
			return String(this.value())
		}

		override reset_value() {
			this.value(null)
		}
		
		@ $mol_mem
		override reset_enabled() {
			return ! ( Number.isNaN( this.value() ) || this.value() === null )
		}
	}
}
