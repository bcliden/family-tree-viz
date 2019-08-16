import { parseCSV, hydratePeople } from "./data-utils";

async function main() {
  /* 
    get file from param if you wish
    any parsers can be used here, really
  */

  const textFile = await parseCSV("static/simpsons.csv");
  // build complex relations
  const familyMembers = await hydratePeople(textFile);
  console.log(familyMembers);
  /* 
    this outputs a nice complex object like: 
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
}

main();
