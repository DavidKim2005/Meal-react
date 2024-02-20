import { useCallback, useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import { Meal, Meals } from "../types"
import axiosApi from "../AxiosApi";
import { Link } from "react-router-dom";


const Home: React.FC = () => {
    const [meal, setMeal] = useState<Meal[]>([]);

    const fetchData = useCallback(async () => {
        try {
            const res = await axiosApi.get<Meals>('/meal.json')
            const data = res.data

            if (data) {
                const parsedMeals = Object.keys(data).map(id => ({
                    ...data[id],
                    id
                }));
                setMeal(parsedMeals)
            } else {
                setMeal([])
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [])

    useEffect(() => {
        void fetchData()
    }, [fetchData])


    return (
        <main className="p-5 text-bg-warning rounded">
            <h1 className="rounded text-bg-light pb-2">Meal List</h1>
            <Link to="/Add" className="btn btn-outline-light mt-2">Add Meal</Link>
            {meal.map((item, index) => (
                <Card key={index} style={{ width: '25rem' }} className="mt-3">
                    <Card.Body className="text-start">
                        <Card.Title className="text-muted fs-2">{item.category}</Card.Title>
                        <Card.Subtitle className="mb-2 mt-3 fs-5">products: {item.product}</Card.Subtitle>
                        <Card.Text className="fs-5">
                            Description: {item.description}
                        </Card.Text>
                        <Card.Text className="fs-5">
                            Number of calories: {item.calories} kcal
                        </Card.Text>
                        <button type="button" className="btn btn-outline-primary ">Edit</button>
                        <button type="button" className="btn btn-outline-danger ms-2">Delete</button>
                    </Card.Body>
                </Card>
            ))}
        </main>
    )
}

export default Home