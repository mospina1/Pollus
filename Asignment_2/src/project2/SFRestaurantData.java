package project2;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.NoSuchElementException;

public class SFRestaurantData {
	public static void main(String[] args) {
		/*
		 * PERSUDO-CODE take input from console, in the form of a string, use that
		 * string as a filepath to search for the file specified, then if file found,
		 * create Arraylist and feed the file line by line into the splitCSVLine
		 * function. If the proper parameters are found in given line then add them to
		 * the Arraylist, if they are not found then don't add them, and remove them
		 * from memory.
		 * 
		 */
		
		if (args.length == 0) 
		{
			System.err.println("Usage Error: the program expects file name as an argument. \n");
			System.exit(1);
		}
		
		File initialFile = new File(args[0]);
		
		if (!initialFile.exists()) 
		{
			System.err.println("Error: the file " + initialFile.getAbsolutePath() + " does not exist.\n");
			System.exit(1);
		}
		if (!initialFile.canRead()) 
		{
			System.err.println("Error: the file " + initialFile.getAbsolutePath() + " cannot be opened for reading.\n");
			System.exit(1);
		}
		//System.out.println("no errors trigered");
		
		Scanner inCSV = null; 
		
		
		try {
			inCSV = new Scanner (initialFile ) ;
		} catch (FileNotFoundException e) 
		{
			System.err.println("Error: the file "+initialFile.getAbsolutePath()+
											" cannot be opened for reading.\n");
			System.exit(1);
		}
		//System.out.println("no errors trigered");
		
		
		String line = null;
		//items are listed as:
		//business_id,**business_name**,**business_address**,business_city,business_state,**business_postal_code**,
		//business_latitude,business_longitude,business_location,**business_phone_number**,
		//inspection_id,**inspection_date**,**inspection_score**,inspection_type,violation_id,**violation_description**,**risk_category**
		// in that exact order
		
		
		String businessName="";			// 1
		String businessAdress="";		// 2
		String postalCode="";			// 5
		String businessPhone="";		// 9
		String inspectionScore="";		// 12
		String inspectionDate="";		// 11
		String riskCategory="";			// 16
		String violationDescription="";	// 15
		
		RestaurantList restaurantList = new RestaurantList(businessName,postalCode);
		inCSV.nextLine();
		 while (inCSV.hasNextLine())
		 {
			 
			 try
			 {
				 // reset the values of the variables
				 businessName="";
				 businessAdress="";
				 postalCode="";
				 businessPhone="";
				 inspectionScore="";
				 inspectionDate="";
				 riskCategory="";
				 violationDescription="";
				 line = inCSV.nextLine();
				 ArrayList<String> parsedData = new ArrayList<String>();
				 parsedData = splitCSVLine(line);
			 
			 		// iterates through parsedData
				 Iterator<String> filter = parsedData.iterator();
			 		
				 	for (int i=0; i<parsedData.size(); i++)
				 	{
						// finds the location of the needed values and places them inside varaibles
				 		if (i==1)
							businessName=filter.next();
			 			else if (i==2)
			 				businessAdress=filter.next();
				 		else if (i==5)
				 			postalCode=filter.next();
				 		else if (i==9)
							businessPhone=filter.next();
			 			else if (i==11)
			 				inspectionDate=filter.next();
			 			else if (i==12)
				 			inspectionScore=filter.next();
				 		else if (i==15)
				 			violationDescription=filter.next();
						 // boolean intresting=false;
				 		else if (i==16)
							riskCategory=filter.next();
			 			else
			 				filter.next();
					}
					filter = parsedData.iterator();
					// checks if the mandatory required data we need is present or if the data was blank
					if (businessName.isBlank())
					{}
					else if (postalCode.isBlank())
					{}
					else if (inspectionDate.isBlank())
					{}
					else if(violationDescription.isBlank())
					{}
					else
					{
						//run the data through to the restaurant class
						restaurantList.addClass(businessName, postalCode, businessAdress, businessPhone, inspectionScore,inspectionDate,riskCategory,violationDescription);
						
					}
					
			 	}
			 catch (NoSuchElementException ex )
			 {
				 //caused by an incomplete or miss-formatted line in the input file
				 System.err.println(line);
			 }
		 }
		 
		 // COPY INPUT METHOD FROM TEST CLASS
			Scanner userInput  = new Scanner (System.in ); 
			String userValue = "";
			
			
			do {
				System.out.println("Enter your search query (name, zip ,quit)" );
				//get value of from the user 
				userValue = userInput.nextLine();
				if (!userValue.equalsIgnoreCase("quit")) { 
					
					String[] userValues = userValue.split(" ");
					String firstValue = userValues[0];
					String secondValue = userValues[1];
					if (userValues.length>2)
					{
					for (int i=2;i<userValues.length;i++)
						secondValue=secondValue+" "+ userValues[i];
					}
					
					
					if (firstValue.equalsIgnoreCase("name"))
					{
						// lookup the name
						
						restaurantList.getMatchingRestaurants (secondValue);
					}
					else if (firstValue.equalsIgnoreCase("zip"))
					{
						// lookup the zip
						restaurantList.getMatchingZip (secondValue);
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
		
	}

	public static ArrayList<String> splitCSVLine(String textLine) {
		if (textLine == null)
			return null;

		ArrayList<String> entries = new ArrayList<String>();
		int lineLength = textLine.length();
		StringBuffer nextWord = new StringBuffer();
		char nextChar;
		boolean insideQuotes = false;
		boolean insideEntry = false;

		// iterate over all characters in the textLine
		for (int i = 0; i < lineLength; i++) {
			nextChar = textLine.charAt(i);
			// handle smart quotes as well as regular quotes
			if (nextChar == '"' || nextChar == '\u201C' || nextChar == '\u201D') {
				// change insideQuotes flag when nextChar is a quote
				if (insideQuotes) {
					insideQuotes = false;
					insideEntry = false;
				} else {
					insideQuotes = true;
					insideEntry = true;
				}
			} else if (Character.isWhitespace(nextChar)) {
				if (insideQuotes || insideEntry) {
					// add it to the current entry
					nextWord.append(nextChar);
				} else { // skip all spaces between entries
					continue;
				}
			} else if (nextChar == ',') {
				if (insideQuotes) { // comma inside an entry
					nextWord.append(nextChar);
				} else { // end of entry found
					insideEntry = false;
					entries.add(nextWord.toString());
					nextWord = new StringBuffer();
				}
			} else {
				// add all other characters to the nextWord
				nextWord.append(nextChar);
				insideEntry = true;
			}
		}
		// add the last word ( assuming not empty )
		// trim the white space before adding to the list
		if (!nextWord.toString().equals("")) {
			entries.add(nextWord.toString().trim());
		}
		return entries;

	}

}