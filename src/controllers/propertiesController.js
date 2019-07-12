import propertyModal from '../modals/property';
import propertySchema from './validation/propertySchema';


class propertiesAd {


  static Allproperties(req, res) {
    return res.status(200).json({
      status: 200,
      data: {
        propertyModal,
      },
    });
  }


  // Post a property adv
  static addProperty(req, res) {
    const idNo = propertyModal.length + 1;

    const {
      owner, status, type, price, state, city, address,
    } = req.body;
    const newProperty = propertySchema.validate({
      id: idNo, owner, status, type, price, state, city, address,
    });

    if (!newProperty.error) {

      propertyModal.push(newProperty);
      return res.status(201).json({
        status: 201,
        data: {
          id: idNo, owner, status, type, price, state, city, address,
        },
      });

    }

    return res.status(400).json({ status: 400, error: newProperty.error.details[0].message });
  }

  // mark product status as sold
  static updatePropertystatus(req, res) {
    const foundWholeObject = propertyModal.find(p => p.id === parseInt(req.params.id));

    if (foundWholeObject.status === 'sold') {
      return res.status(400).json({ status: 400, error: 'status already sold' });
    }
    foundWholeObject.status = 'sold';


    return res.status(200).json({
      status: 200,
      data: {
        owner: foundWholeObject.owner, status: foundWholeObject.status,
      },
    });
  }

  // Update product
  static updateProperty(req, res) {

    const Property = propertyModal.find(p => p.id === parseInt(req.params.id));

    Property.price = req.body.price;
    Property.state = req.body.state;
    Property.type = req.body.type;

    return res.status(200).json({
      status: 200,
      data: {
        Property,
      },
    });


  }

  // Delete Property
  static deleteProperty(req, res) {

    const inputedData = parseInt(req.params.id);

    const result = propertySchema.validate({
      inputedData,
    });

    // if (!result.error) {

    const Property = propertyModal.find(p => p.id === inputedData);

    if (!Property) {
      return res.status(404).json({
        status: 404,
        error: 'property not found',
      });
    }

    const deletObj = propertyModal.indexOf(Property);
    propertyModal.splice(deletObj, 1);

    return res.status(200).json({
      status: 200,
      data: {
        propertyModal,
      },
    });
    // }
    // return res.status(400).json({ status: 400, error: result.error.details[0].message })

    // res.send(inputedData);
  }

  //  get one Property
  static oneProperty(req, res) {
    const product = propertyModal.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ status: 404, error: 'property not found' });
    }

    return res.status(200).json({ status: 200, data: product });

  }

  // find By Detail
  static findByDetail(req, res) {
    const QuerySearch = propertyModal.filter(p => p.type === parseInt(req.query.type));


    return res.status(200).json({ status: 200, data: { QuerySearch } });

    // return res.status(404).json({ status: 404, error: 'property Not found'});


  }
}

export default propertiesAd;
