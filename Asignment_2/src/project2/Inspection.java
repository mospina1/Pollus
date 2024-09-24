package project2;

public class Inspection {
	private String inspectionScore;
	private Date inspectionDate;
	private String riskCategory;
	private String violationDescription;
	
	public Inspection (String inspectionScore,Date inspectionDate, String riskCategory, String violationDescription)
	{
		if (inspectionScore.equals(null))
			inspectionScore="n/a";
		else
			this.inspectionScore=inspectionScore;
		
		this.inspectionDate=inspectionDate;
		this.riskCategory=riskCategory;
		this.violationDescription=violationDescription;
	}
	public void PrintInspection()
	{
		System.out.println("\t"+inspectionScore+", "+inspectionDate.PrintDate()+", "+riskCategory+", "+violationDescription);
	}
	public Date getDate()
	{
		return inspectionDate;
	}

}
