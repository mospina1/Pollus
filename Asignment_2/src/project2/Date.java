package project2;

public class Date implements Comparable<Date>{
	
	private int day;
	private int month;
	private int year;
	
	/**
	 * @param date
	 * The first constructor should throw an instance of IllegalArgumentException if it is called with a null parameter, or a string
	 * that does not match either MM/DD/YYYY or MM/DD/YY pattern, or a string that matches the pattern, but for which the values are invalid
	 * (see below). Note: the MM and DD specifications should always be exactly two characters long, so for January 5, 2019, the string will be
	 * “01/05/19” or “01/05/2019”.
	 */
	public Date(String date) throws IllegalArgumentException
	{
		if (date == null)
		{
			throw new IllegalArgumentException("This date was null");
		}
		//MM/DD/YYYY or MM/DD/YY
		
		try 
		{
			
			if(date.split("/")[0|1].length()!=2)
			{
				
				throw new IllegalArgumentException("invalid day/month");
			}
			if((date.split("/")[2].length()!=2))
			{
				if (date.split("/")[2].length()!=4)
					throw new IllegalArgumentException("invalid year");
			}
			
			this.month = Integer.valueOf(date.split("/")[0]);
			this.day = Integer.valueOf(date.split("/")[1]);
			this.year = Integer.valueOf(date.split("/")[2]);
		}
		catch(Exception e) {
			throw new IllegalArgumentException("invalid date");
		}
		
	}
	
	public Date(int month, int day, int year) throws IllegalArgumentException
	{
		// checks if the month given is a valid month
		if (month>=1&&month<=12)
		{
			//checks if the year given is a valid year
			if (year>=2000&&year<=2025)
			{
				//checks if the day is part of feb. during a leap year
				if (year%4==0&&month==2)
				{
					// checks if the day is within the 29 days of feb
					if(day>=1&&day<=29)
					{
						this.year=year;
						this.month=month;
						this.day=day;
					}
					else
						throw new IllegalArgumentException("invalid date");
				}
				// checks feb. for all non leap year
				else if (month==2)
				{
					if (day>=1&&day<=28)
					{
						this.year=year;
						this.month=month;
						this.day=day;
					}
					else
						throw new IllegalArgumentException("invalid date");
				}
				// checks if day is in January, March, May, July, August, October and December
				else if (month==1||month==3||month==5||month==7||month==8||month==10||month==12)
				{
					if (day>=1&&day<=31)
					{
						this.year=year;
						this.month=month;
						this.day=day;
					}
					else
						throw new IllegalArgumentException("invalid date");
				}
				// runs only for [April, June, September and November] due to all previous checks
				else
				{
					if (day>=1&&day<=30)
					{
						this.year=year;
						this.month=month;
						this.day=day;
					}
					else
						throw new IllegalArgumentException("invalid date");
				}
				
				
			}
			else
			{
				throw new IllegalArgumentException("invalid date");
			}
		}
		else
		{
			throw new IllegalArgumentException("invalid date");
		}
		
		
	}
	@Override
	public int compareTo(Date o)
	{
		
		int tempYear1;
		int tempYear2;
		if (this.year/10>10)
			tempYear1=this.year;
		else
			tempYear1=this.year+2000;
		if (year/10>10)
			tempYear2=year;
		else
			tempYear2=year+2000;
		if (this.year>year)
			return 1;
		if (this.year<year)
			return -1;
		if (this.month>month)
			return 1;
		if (this.month<month)
			return -1;
		if (this.day>day)
			return 1;
		if (this.day<day)
			return -1;
		return 1;
		
		
		
	}
	public String PrintDate()
	{
		if (year/10>10)
			return (day + "/"+month + "/" + year);
		else
			return (day + "/"+month + "/20" + year);
	}

}
