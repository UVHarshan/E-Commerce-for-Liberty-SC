import React from 'react';

export default function PowerBI() {
    //pdf
function createPDF(props) {
    // get elements of report data
    var report1 = document.getElementById("report1").innerHTML;
  
    var style = "<style>";
    style =
      style + "table {width: 100%;font: 17px Calibri;} body{font-size:12px}";
    style =
      style +
      "table, th, td {border: solid 1px #DDD;color: black ;border-collapse: collapse;";
    style = style + "padding: 2px 3px;text-align: center;}";
    style = style + "</style>";
  
    // CREATE A WINDOW OBJECT.
    var win = window.open("", "", "height=700,width=700");
  
    win.document.write("<title>Report 1</title>"); // <title> FOR PDF HEADER.
    win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
    win.document.write("</head>");
    win.document.write(report1);
    // THE TABLE CONTENTS INSIDE THE BODY TAG.
    win.document.write("</body></html>");
  
    win.document.close(); // CLOSE THE CURRENT WINDOW.
  
    win.print(); // PRINT THE CONTENTS.
  }

    return (
        <div id= "report1">
           <iframe width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=9fbd61a9-202e-494f-97dd-c52bcab65858&autoAuth=true&ctid=aa232db2-7a78-4414-a529-33db9124cba7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe>
           <button
          onClick={createPDF}
          style={{
            backgroundColor: "#050f2c",
            color: "#2DDD98",
            fontSize: "20px",
            height: "50px",
            marginTop: "50px",
            marginLeft: "50px",
          }}
        >
          Download Report
        </button>
        </div>
    )

}
