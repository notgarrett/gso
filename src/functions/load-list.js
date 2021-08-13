import mongoose from "mongoose";
import { ProfileSchema } from "../models/user-model";
import list from "../../list.json";

const mainsheet = "1v9qGeLpHUDjGgskqW8zyC4Arvh5DsFr28O0sM6szYLg";

const User = mongoose.model("Users", ProfileSchema);

export const loadList = (client) => {
  const gsapi = google.sheets({ version: "v4", auth: cl });

  User.find({}, (err, doc) => {
    if (err) throw err;

    list.forEach((set) => {
      gsapi.spreadsheets.values.clear({
        spreadsheetId: mainsheet,
        range: `${set.sheetname}!${set.col}`,
      });

      let array = [];
      // Oh god here we goooo
      doc.map((r) => {
        if (r.Roles) {
          r.Roles.map((x) => {
            if (x === set.roleid) array.push([r.RobloxUserName]);
          });
        }
      });

      gsapi.spreadsheets.values.update({
        spreadsheetId: mainsheet,
        range: `${set.sheetname}!${set.col}`,
        valueInputOption: "USER_ENTERED",
        resource: { values: array },
      });
    });
  });
};
