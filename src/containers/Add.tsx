import axiosApi from "../AxiosApi";
import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Meal } from "../types";
import { useNavigate } from "react-router-dom";

const Add: React.FC = () => {
    const [formData, setFormData] = useState<Meal>({
        category: "",
        product: "",
        description: "",
        calories: 0
    });
    const navigate = useNavigate()
    const [submit, setSumbit] = useState(false)
    const [submitSpinner, setSubmitSpinner] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target;
        const name = target.name;
        const value = target.value
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitSpinner(true)

        try {
            await axiosApi.post('/meal.json', formData);
            setFormData({
                category: "",
                product: "",
                description: "",
                calories: 0
            })
            setSumbit(true)

        } catch (e) {
            console.log(e);
        }
    }

    if (submit) {
        return navigate('/')
    }

    return (
        <main className="border-warning-subtle rounded p-5 text-bg-light shadow">
            <Form onSubmit={handleSubmit}>
                <h3 className="mb-4">Add/Edit form</h3>
                <Form.Select aria-label="Default select example" name="category" onChange={handleChange} value={formData.category}>
                    <option>Choose meal</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                </Form.Select>
                <Form.Group className="mb-3 mt-2">
                    <Form.Label>Product name</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name" name="product" onChange={handleChange} value={formData.product} />
                </Form.Group>
                <Form.Group className="">
                    <Form.Label>Enter description</Form.Label>
                    <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={formData.description} />
                    <Form.Label>Enter calories</Form.Label>
                    <Form.Control type="number" name="calories" onChange={handleChange} value={formData.calories} />
                </Form.Group>
                <Button type="submit" variant="success mt-4">
                    {submitSpinner ? (
                        <Spinner animation="border" size="sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    ) : (
                        "Submit"
                    )}</Button>
            </Form>
        </main>
    );
}

export default Add;
