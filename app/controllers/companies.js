var Companies = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Company.all(function(err, companies) {
      self.respond({params: params, companies: companies});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , company = geddy.model.Company.create(params);

    if (!company.isValid()) {
      this.flash.error(company.errors);
      this.redirect({action: 'add'});
    }
    else {
      company.save(function(err, data) {
        if (err) {
          self.flash.error(err);
          self.redirect({action: 'add'});
        }
        else {
          self.redirect({controller: self.name});
        }
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Company.first(params.id, function(err, company) {
      if (!company) {
        var err = new Error();
        err.statusCode = 404;
        self.error(err);
      }
      else {
        self.respond({params: params, company: company.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Company.first(params.id, function(err, company) {
      if (!company) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      }
      else {
        self.respond({params: params, company: company});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Company.first(params.id, function(err, company) {
      company.updateProperties(params);
      if (!company.isValid()) {
        this.flash.error(company.errors);
        this.redirect({action: 'edit'});
      }
      else {
        company.save(function(err, data) {
          if (err) {
            self.flash.error(err);
            self.redirect({action: 'edit'});
          }
          else {
            self.redirect({controller: self.name});
          }
        });
      }
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Company.remove(params.id, function(err) {
      if (err) {
        self.flash.error(err);
        self.redirect({action: 'edit'});
      }
      else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Companies = Companies;
