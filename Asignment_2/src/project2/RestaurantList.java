package project2;

import java.util.ArrayList;
import java.util.Iterator;

public class RestaurantList{
	private ArrayList<Restaurant> restaurantsList = new ArrayList<Restaurant>();
	private ArrayList<Restaurant> foundRestaurants = new ArrayList<Restaurant>();
	private ArrayList<Inspection> inspectionList = new ArrayList<Inspection>();
	private ArrayList<Inspection> foundInspection = new ArrayList<Inspection>();
	
	public RestaurantList (String name, String zip)
	{
		Restaurant restaurant = new Restaurant(name,zip);
		restaurantsList.add(restaurant);
	}
	
	public RestaurantList (String name, String zip, String address, String phone)
	{
		Restaurant restaurant = new Restaurant(name, zip, address, phone);
		restaurantsList.add(restaurant);
	}
	
	
	public void addClass (String name, String zip, String address, String phone, String inspectionScore,String inspectionDate, String riskCategory, String violationDescription)
	{
		Restaurant restaurant = new Restaurant(name,zip, address,phone);
		restaurantsList.add(restaurant);
		inspectionDate=inspectionDate.split(" ")[0];
		Date iDate=new Date(inspectionDate);
		
		Inspection inspection = new Inspection(inspectionScore,iDate,riskCategory,violationDescription);
		inspectionList.add(inspection);
	}
	

	public void getMatchingRestaurants ( String keyword )
	{
		//String indexOfx="";
		// clears the arraylists foundRestaurants and foundInspection so old searches don't impact current search
		foundRestaurants.clear();
		foundInspection.clear();

		// loops through the list of usable values
		for (int i=0;i<this.restaurantsList.size();i++)
		{
			// finds any instance of the name that was inputed
			if(restaurantsList.get(i).getName().contains(keyword)) 
			{
				
				//System.out.println(restaurantsList.get(i).getName());
				// adds both the 
				foundRestaurants.add(restaurantsList.get(i));
				foundInspection.add(inspectionList.get(i));
			}
		}
		
		Printer printer = new Printer(foundRestaurants, foundInspection);
		
	}
	
	
	
	
	
	public void getMatchingZip ( String keyword )
	{
		//clears past searchs
		foundRestaurants.clear();
		foundInspection.clear();
		
		//System.out.println("zip is " + keyword); // input works
		for (int i=0;i<this.restaurantsList.size();i++)
		{
			
			if(restaurantsList.get(i).getZip().contains(keyword)) 
			{
				foundRestaurants.add(restaurantsList.get(i));
				foundInspection.add(inspectionList.get(i));
			}
		}
		Printer printer = new Printer(foundRestaurants, foundInspection);
	}
}
