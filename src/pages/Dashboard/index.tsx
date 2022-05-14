import { useEffect, useState } from 'react';
import { Food } from '../../components/Food';
import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodProps } from '../../interfaces';
import api from '../../services/api';
import { FoodsContainer } from './styles';

export function Dashboard() {
	const [foods, setFoods] = useState<FoodProps[]>([
		{
			id: 1,
			name: 'Test',
			description: 'Desc Test',
			price: 1000,
			available: false,
			image: '',
		},
	]);
	const [editingFood, setEditingFood] = useState<FoodProps>({
		id: 1,
		name: 'Test',
		description: 'Desc Test',
		price: 1000,
		available: false,
		image: '',
	});
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const getFoods = async () => {
			const response = await api.get('/foods');

			setFoods(response.data);
		};
		getFoods();
	}, []);

	const handleAddFood = async (food: FoodProps[]) => {
		try {
			const response = await api.post<FoodProps>('/foods', {
				...food,
				available: true,
			});

			setFoods(prev => [...prev, response.data]);
		} catch (err) {
			console.log(err);
		}
	};

	const handleUpdateFood = async (food: FoodProps[]) => {
		try {
			const foodUpdated = await api.put(`/foods/${editingFood.id}`, {
				...editingFood,
				...food,
			});

			const foodsUpdated = foods.map(f =>
				f.id !== foodUpdated.data.id ? f : foodUpdated.data
			);

			setFoods(foodsUpdated);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteFood = async (id: number) => {
		await api.delete(`/foods/${id}`);

		const foodsFiltered = foods.filter(food => food.id !== id);

		setFoods(foodsFiltered);
	};

	const toggleModal = () => {
		setModalOpen(prev => !prev);
	};

	const toggleEditModal = () => {
		setEditModalOpen(prev => !prev);
	};

	const handleEditFood = (food: FoodProps) => {
		setEditingFood(food);
		setEditModalOpen(true);
	};

	return (
		<>
			<Header openModal={toggleModal} />
			<ModalAddFood
				isOpen={modalOpen}
				setIsOpen={toggleModal}
				handleAddFood={handleAddFood}
			/>
			<ModalEditFood
				isOpen={editModalOpen}
				setIsOpen={toggleEditModal}
				editingFood={editingFood}
				handleUpdateFood={handleUpdateFood}
			/>

			<FoodsContainer data-testid="foods-list">
				{foods &&
					foods.map(food => (
						<Food
							key={food.id}
							food={food}
							handleDelete={handleDeleteFood}
							handleEditFood={handleEditFood}
						/>
					))}
			</FoodsContainer>
		</>
	);
}
