import { text } from "d3";
import { parse } from "papaparse";

export function parseCSV(path) {
  return text(path)
    .then(data => {
      // split on double new line to cover the arbitrary new line + new headers
      let [members, relations] = data.split("\n\n").map(str => str.trim());

      members = parse(members, {
        comments: "#",
        header: true,
        error: console.error
      });

      relations = parse(relations, {
        comments: "#",
        header: true,
        error: console.error
      });

      return {
        members: members.data,
        relations: relations.data
      };
    })
    .catch(console.err);
}

export function hydratePeople(parsedFile) {
  // expect input { members[], relations[] }
  const { members, relations } = parsedFile;
  // let complexMembers = [...members.map(addRelationsArray)];
  let complexMembers = [...members];
  relations.forEach(row => {
    // row: { id, relation, id2 }
    const from = members.indexOf(members.find(d => d.Id == row.Id)); // ugly way to get the index of a given ID
    const to = members.indexOf(members.find(d => d.Id == row.Id2));
    const relation = getRelation(row.Relation.toLowerCase());

    // here, I push the relation + its target onto the member
    if (!complexMembers[from][relation]) {
      // if the given filed doesn't exist
      complexMembers[from][relation] = [];
    }
    // push member of that relation
    complexMembers[from][relation].push(complexMembers[to]);
  });
  return complexMembers;
}

function addRelationsArray(row) {
  return { ...row, relations: [] };
}

function getRelation(relation) {
  switch (relation) {
    case "parent of":
      return "children";
    case "spouse of":
      return "spouse";
    default:
      return null;
  }
}
