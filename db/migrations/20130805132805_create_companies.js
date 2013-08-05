var CreateCompanies = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'string');
          t.column('source', 'string');
          t.column('status', 'string');
          t.column('notes', 'text');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('company', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('company', callback);
  };
};

exports.CreateCompanies = CreateCompanies;
