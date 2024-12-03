function createResultsFile() {
    // Create the file content
    let content = "name\tq1\tq2\tq3\tq4\tq5\tq6\tq8\tq9\tq10\tq11\n";

    // Define sample data (you can replace this with actual data from variables)
    const sampleData = [
        "John Doe\t42\t85\t78\t90\t88\t76\t95\t92\t89\t88",
        "Jane Smith\t95\t92\t89\t88\t85\t82\t91\t94\t93\t90",
        "Bob Johnson\t88\t90\t92\t89\t86\t83\t90\t93\t91\t88"
    ];
    
    // remove smaple data after and change code under *****
    for (let i = 0; i < num_of_examinees; i++) 
    {
        let examinee_name = ; // examinee name from data base

        content += examinee_name +"\t";
        for (let j = 0; j < num_of_questions; i++)
        {
        let examnee_answer = ; // 0/1 for if q was right or wrong for question #j)
        content += examinee_ansmer + "\t";
        }
        content += "\n";
    }

    // Add the sample data to the content **************
    sampleData.forEach(item => {
        content += item + "\n";
    });

    // Create a Blob with the file content
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'results.txt';

    // Append the link to the body
    document.body.appendChild(link);

    // Click the link to trigger the download
    link.click();

    // Clean up (remove the link)
    document.body.removeChild(link);
}

// Add event listener to the button
document.getElementById('generateFile').addEventListener('click', createResultsFile);
