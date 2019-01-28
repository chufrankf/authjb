
import config from '../config';

exports.findOne = function(id) {
  return config.clients.find( (x) => {return x.id === id;});
};