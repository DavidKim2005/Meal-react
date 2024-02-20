import { useCallback, useEffect, useState } from "react"
import { Card, Spinner } from "react-bootstrap"
import { Meal, Meals } from "../types"
import axiosApi from "../AxiosApi";
import { Link } from "react-router-dom";


const Home: React.FC = () => {
    const [meal, setMeal] = useState<Meal[]>([]);
    const [deleteSpinner, setDeleteSpinner] = useState(false)
    const [totalCalories, setTotalCalories] = useState(0)

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
                caloriesReduce(parsedMeals)
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

    const caloriesReduce = (calories: Meal[]) => {
        const total = calories.reduce((acc, calories) => acc + parseInt(calories.calories), 0)
        setTotalCalories(total)
    }

    const deleteMeal = async (id) => {
        try {
            setDeleteSpinner(true)
            await axiosApi.delete(`/meal/${id}.json`);
            const updateMeal = meal.filter(item => item.id !== id)
            setMeal(updateMeal)
            caloriesReduce(updateMeal)
        } catch (e) {
            console.log(e);
        } finally {
            setDeleteSpinner(false)
        }
    }


    return (
        <main className="p-5 text-bg-warning rounded">
            <h1 className="rounded text-bg-light pb-2">Meal List</h1>
            <Link to="/Add" className="btn btn-outline-light mt-2">Add Meal</Link>
            <h3>Total Calories: {totalCalories}</h3>
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
                        <button type="button" className="btn btn-outline-danger ms-2" onClick={() => deleteMeal(item.id)}>
                            {deleteSpinner ? (
                                <Spinner animation="border" size="sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            ) : (
                                "Delete"
                            )}

                        </button>
                    </Card.Body>
                </Card>
            ))}
        </main>
    )
}

export default Home