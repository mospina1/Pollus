package project2;

public class Restaurant {
	
	private String name;
	private String zip;
	private String address;
	private String phone;
	
	public Restaurant(String name, String zip)
	{
		this.name=name;
		this.zip=zip;
	}
	public Restaurant(String name, String zip, String address, String phone)
	{
		this.name=name;
		this.zip=zip;
		this.address=address;
		this.phone=phone;
	}
	
	public String getZip()
	{
		return zip;
	}
	public String getName()
	{
		return name;
	}
	public String getAddress()
	{
		return address;
	}
	public String getPhone()
	{
		return phone;
	}

}
