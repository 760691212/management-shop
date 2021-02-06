import merge from "webpack-merge";

const config = {
  hosts: {
    resource: "http://manage.shop.com/",
    request: "http://api.shop.com"
  }
};

export default merge(config);
