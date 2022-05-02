namespace $ {
	export class $mol_gallery_demo extends $mol_example {
		
		/**
		 * ```tree
		 * title \Gallery of cards
		 * ```
		 */
		title() {
			return "Gallery of cards"
		}
		
		/**
		 * ```tree
		 * count 101
		 * ```
		 */
		count() {
			return 101
		}
		
		/**
		 * ```tree
		 * sub / <= App
		 * ```
		 */
		sub() {
			return [
				this.App()
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * Item# $mol_link
		 * 	minimal_width 100
		 * 	uri \https://thiscatdoesnotexist.com/
		 * 	style * backgroundImage \url('https://thiscatdoesnotexist.com/')
		 * 	sub / <= Item_title#
		 * ```
		 */
		@ $mol_mem_key
		Item(id: any) {
			const obj = new this.$.$mol_link()
			
			obj.minimal_width = () => 100
			obj.uri = () => "https://thiscatdoesnotexist.com/"
			obj.style = () => ({
				backgroundImage: "url('https://thiscatdoesnotexist.com/')"
			})
			obj.sub = () => [
				this.Item_title(id)
			] as readonly any[]
			
			return obj
		}
		
		/**
		 * ```tree
		 * tags /
		 * 	\$mol_link
		 * 	\$mol_paragraph
		 * 	\gallery
		 * 	\image
		 * 	\adaptive
		 * ```
		 */
		tags() {
			return [
				"$mol_link",
				"$mol_paragraph",
				"gallery",
				"image",
				"adaptive"
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * items /
		 * ```
		 */
		items() {
			return [
			] as readonly any[]
		}
		
		/**
		 * ```tree
		 * App $mol_gallery items <= items
		 * ```
		 */
		@ $mol_mem
		App() {
			const obj = new this.$.$mol_gallery()
			
			obj.items = () => this.items()
			
			return obj
		}
		
		/**
		 * ```tree
		 * item_title# \
		 * ```
		 */
		item_title(id: any) {
			return ""
		}
		
		/**
		 * ```tree
		 * Item_title# $mol_paragraph title <= item_title#
		 * ```
		 */
		@ $mol_mem_key
		Item_title(id: any) {
			const obj = new this.$.$mol_paragraph()
			
			obj.title = () => this.item_title(id)
			
			return obj
		}
	}
	
}

