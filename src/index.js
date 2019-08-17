import { parseCSV, hydratePeople } from "./data-utils";
import { drawChart } from "./chart";

async function main() {
  /* 
    get file from param if you wish
    any parsers can be used here, really
  */

  const textFile = await parseCSV("static/simpsons.csv");
  // build complex relations
  const familyMembers = await hydratePeople(textFile);
  // see comment @ bottom for structure of familyMembers
  // console.log(familyMembers);
  console.log("total family chart: ", familyMembers);
  drawChart(familyMembers);
}

main();

/* 
  familyMembers structure:

    {
    "Id": "1",
    "Name": "Homer Simpson",
    "Link": "nolink",
    "Gender": "M",
    "Birth": "1960",
    "relations": [
      {
        "relation": "Parent Of",
        "member": {
          "Id": "3",
          "Name": "Bart Simpson",
          "Link": "nolink",
          "Gender": "M",
          "Birth": "1980",
          "relations": []
        }
      },
      {
        "relation": "Parent Of",
        "member": {
          "Id": "4",
          "Name": "Lisa Simpson",
          "Link": "nolink",
          "Gender": "F",
          "Birth": "1982",
          "relations": []
        }
      },
      {
        "relation": "Parent Of",
        "member": {
          "Id": "5",
          "Name": "Maggie Simpson",
          "Link": "nolink",
          "Gender": "F",
          "Birth": "1986",
          "relations": []
        }
      },
      {
        "relation": "Spouse Of",
        "member": {
          "Id": "2",
          "Name": "Marge Simpson",
          "Link": "nolink",
          "Gender": "F",
          "Birth": "1960",
          "relations": [
            {
              "relation": "Parent Of",
              "member": {
                "Id": "3",
                "Name": "Bart Simpson",
                "Link": "nolink",
                "Gender": "M",
                "Birth": "1980",
                "relations": []
              }
            },
            {
              "relation": "Parent Of",
              "member": {
                "Id": "4",
                "Name": "Lisa Simpson",
                "Link": "nolink",
                "Gender": "F",
                "Birth": "1982",
                "relations": []
              }
            },
            {
              "relation": "Parent Of",
              "member": {
                "Id": "5",
                "Name": "Maggie Simpson",
                "Link": "nolink",
                "Gender": "F",
                "Birth": "1986",
                "relations": []
              }
            }
          ]
        }
      }
  ]
}
  */
