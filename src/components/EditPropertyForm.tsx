'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Property } from '@prisma/client';
import { EditPropertySchema } from '@/lib/validationSchemas';
import { editProperty } from '@/lib/dbActions';

const onSubmit = async (data: Property) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProperty(data);
  swal('Success', 'Your property has been updated', 'success', {
    timer: 2000,
  });
};

const EditPropertyForm = ({ property }: { property: Property }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Property>({
    resolver: yupResolver(EditPropertySchema),
  });
  // console.log(stuff);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Property</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={property.id} />
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <input
                        type="text"
                        defaultValue={property.address}
                        {...register('address')}
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.address?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">$</span>
                        </div>
                        <input
                          type="number"
                          defaultValue={property.price}
                          {...register('price')}
                          className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        />
                      </div>
                      <div className="invalid-feedback">{errors.price?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Bedrooms</Form.Label>
                      <input
                        type="number"
                        defaultValue={property.bedrooms}
                        {...register('bedrooms')}
                        className={`form-control ${errors.bedrooms ? 'is-invalid' : ''}`}
                        min={0}
                        max={6}
                      />
                      <div className="invalid-feedback">{errors.bedrooms?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Bathroom</Form.Label>
                      <input
                        type="number"
                        defaultValue={property.bathrooms}
                        {...register('bathrooms')}
                        className={`form-control ${errors.bathrooms ? 'is-invalid' : ''}`}
                        min={0}
                        max={6}
                      />
                      <div className="invalid-feedback">{errors.bathrooms?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Square Feet</Form.Label>
                      <input
                        type="text"
                        defaultValue={property.sqft}
                        {...register('sqft')}
                        className={`form-control ${errors.sqft ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.sqft?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Condition</Form.Label>
                      <select
                        {...register('condition')}
                        defaultValue={property.condition}
                        className={`form-control ${errors.condition ? 'is-invalid' : ''}`}
                      >
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="PENDING">PENDING</option>
                        <option value="UNAVAILABLE">UNAVAILABLE</option>
                      </select>
                      <div className="invalid-feedback">{errors.condition?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <input type="hidden" {...register('landlord')} value={property.landlord} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary" value="Submit" as="input" />
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPropertyForm;
