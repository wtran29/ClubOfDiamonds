export class User {
	public firstname: String = ''; 
	public lastname: String = '';
	public email: String = '';
	public password: String = '';
	public confirm: String = '';
	// public address: { street: String, unit: String, city: String, state: String, zip: Number};
	public agent: String = '';
	public phone: String = '';
	public gender: String = '';
	// public birthdate: Date = null;
	public createdAt: Date = new Date();
	public updatedAt: Date = new Date();
}
