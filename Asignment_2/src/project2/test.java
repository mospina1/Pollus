package project2;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class test {
	
	public static void main(String[] args) {
	//interactive mode: 
	
	Scanner userInput  = new Scanner (System.in ); 
	String userValue = "";
	
	
	do {
		System.out.println("Enter your search query" );
		//get value of from the user 
		userValue = userInput.nextLine();
		if (!userValue.equalsIgnoreCase("quit")) { 
			
			String[] userValues = userValue.split(" ");
			String firstValue = userValues[0];
			String secondValue = userValues[1];
			
			if (firstValue.equalsIgnoreCase("name"))
			{
				// lookup the name
			}
			else if (firstValue.equalsIgnoreCase("zip"))
			{
				// lookup the zip
			}
			else if (firstValue.equalsIgnoreCase("quit"))
			{}
			else
			{
				System.out.println(firstValue+": is not a valid search parameter, try again");
			}
			
		}
		
	} while (!userValue.equalsIgnoreCase("quit"));     
	
	userInput.close();

	
	/*
	//-------------------------------------------------------------------------
	// TEST DATA BELOW USING ONE LINE OF INPUTED DATA
	line = inCSV.nextLine(); 
	ArrayList<String> parsedData = new ArrayList<String>();
	parsedData = splitCSVLine(line);
	
	// filters data
	Iterator<String> filter = parsedData.iterator();
	
	for (int i=0; i<17; i++) 
	{
		//this area should be turned into a space to check if the required data is here and if it is, send it to the restaurent class
		System.out.println(filter.next());
	}
	filter = parsedData.iterator();
	// THIS CODE WORKS FOR ONE INSTANCE 
	//--------------------------------------------------------------------------
	*/
	//----------------------------------------------
	//OLD CODE FOR FILTERING
	/*
	while (inCSV.hasNextLine())
	 {
		 String hold[] = new String[17];
		 try
		 {
		 		line = inCSV.nextLine();
		 		ArrayList<String> parsedData = new ArrayList<String>();
		 		parsedData = splitCSVLine(line);
		 
		 		// filters data Iterator<String> filter = parsedData.iterator();
		 		Iterator<String> filter = parsedData.iterator();
		 		
		 		
		 			 
			 		for (int i=0; i<parsedData.size(); i++)
			 		{
			 			hold[i]=filter.next();
			 			System.out.println("hold: "+hold[i]);
			 			//items are listed as:
			 			//business_id,**business_name**,**business_address**,business_city,business_state,**business_postal_code**,
			 			//business_latitude,business_longitude,business_location,**business_phone_number**,
			 			//inspection_id,inspection_date,inspection_score,inspection_type,violation_id,violation_description,risk_category
			 			// in that exact order
			 			
						// add a filter and check here before adding them to class.
			 			
					}
			 		
			 		// hold[1]==business_name
			 		// hold[2,3,4]==business_address,business_city,business_state	respectively
			 		// hold[5]==business_postal_code
			 		// hold[9]==business_phone_number
			 		if (!(hold[1].isBlank()&&hold[2].isBlank()&&hold[3].isBlank()&&hold[4].isBlank()&&hold[5].isBlank()&&hold[9].isBlank())) // filters out and quietly removes all the 'junk' data
			 		{
			 			System.err.println("if: "+hold[0]);
			 		}
			 		
					filter = parsedData.iterator();
					System.out.println();

		 	}
		 
		 catch (NoSuchElementException ex )
		 {
				//caused by an incomplete or miss-formatted line in the input file
				 System.err.println(line);
		 }
	 }
	 */
	}
}
