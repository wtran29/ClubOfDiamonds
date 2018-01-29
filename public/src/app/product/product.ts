import { User } from "../login/user";

export class Product {
	public prodID: Number = Math.floor(Math.random() * 99999) + 1;
	public title: String = '';
	public highlights: String='';
	public description: String = '';
	public price: Number = null;
	public image: String = '';
	public location: String = '';
	public user_id: String= '';
	public createdAt: Date = new Date();
	public updatedAt: Date = new Date();
}
