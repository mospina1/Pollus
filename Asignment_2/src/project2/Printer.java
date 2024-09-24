package project2;

import java.util.ArrayList;
import java.util.Iterator;

public class Printer {
//	String businessName="";			// 1
//	String businessAdress="";		// 2
//	String postalCode="";			// 5
//	String businessPhone="";		// 9
//	String inspectionScore="";		// 12
//	String inspectionDate="";		// 11
//	String riskCategory="";			// 16
//	String violationDescription="";	// 15
	private ArrayList<String> uniquePlace = new ArrayList<String>();
	
	public Printer(ArrayList<Restaurant> restaurants, ArrayList<Inspection> inspections)
	{
		//below for loop finds all unique addresses, which we will use to find all the inspection results from each location
		for (int i=0; i<restaurants.size();i++)
			if (!uniquePlace.contains(restaurants.get(i).getAddress()))
			{
				uniquePlace.add(restaurants.get(i).getAddress());
				//System.out.println(uniquePlace.size());
			}
		
		
		
		// THIS IS THE THING THAT IS DOING ALL THE PRINTING
		boolean namePrinted=false;
		ArrayList<Inspection> iList = new ArrayList<Inspection>();
		
		for (int i=0; i<uniquePlace.size();i++)
		{
			for (int j=0; j<restaurants.size();j++)
			{
				
				if (restaurants.get(j).getAddress().equals(uniquePlace.get(i)))
				{
					if (namePrinted==false)
					{
						namePrinted=true;
						System.out.println("\n"+restaurants.get(j).getName());
						System.out.println("-------------------------------");
						System.out.println("address\t\t\t: " + restaurants.get(j).getAddress());
						System.out.println("zip\t\t\t: " + restaurants.get(j).getZip());
						System.out.println("phone\t\t\t: " + restaurants.get(j).getPhone());
						System.out.println("recent inspection results:");
					}
					//adds the inspections for a location and seperates it from the other arrayList, then I take
					// iLsit and sort it based on dates and then print
					iList.add(inspections.get(j));
				}
			}
			

			//sorts the inspections to by dates
			//has some bugs that I didn't know how to fix, sometimes the dates are not in the correct order while other times they are
			for (int k = 1; k < iList.size(); k++) {
	            Inspection currentInspection = iList.get(k);
	            Date currentDate = currentInspection.getDate();
	            int j = k - 1;

	            while (j >= 0 && iList.get(j).getDate().compareTo(currentDate) < 0) {
	                iList.set(j + 1, iList.get(j));
	                j--;
	            }

	            iList.set(j + 1, currentInspection);
	        }

	        // Print the sorted inspections
	        for (Inspection inspection : iList) {
	            inspection.PrintInspection();
	        }
	        // resets the arraylist for the next restaurant
			namePrinted=false;
			iList.clear();
		}
		
	}
	
	
	
}
