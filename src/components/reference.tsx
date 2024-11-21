'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addProperty } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddStuffSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  address: string; price: number; condition: string; bedrooms: number; bathrooms: number; sqft: number
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addProperty(data);
  swal('Success', 'Your item has been added', 'success', {
    timer: 2000,
  });
};

const AddStuffForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddStuffSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Add Property</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Address</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input
                      type="number"
                      {...register('quantity')}
                      className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    />
                  </div>
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Condition</Form.Label>
                  <select {...register('condition')} className={`form-control ${errors.condition ? 'is-invalid' : ''}`}>
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                  <div className="invalid-feedback">{errors.condition?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <div className="py-3">
                  <h3>Property Description</h3>
                </div>
                <Form.Group>
                  <Form.Label>Image</Form.Label>
                  <input
                    type="text"
                    {...register('name')}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.name?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bedrooms</Form.Label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    min={0}
                    max={6}
                  />
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Bathrooms</Form.Label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    min={0}
                    max={6}
                  />
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Sqrft</Form.Label>
                  <input
                    type="number"
                    {...register('quantity')}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                    min={0}
                  />
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
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

export default AddStuffForm;