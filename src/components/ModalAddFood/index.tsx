import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { FoodProps } from '../../interfaces';
import { RefObject, useRef } from 'react';
import { FormHandles } from '@unform/core';

interface ModalAddFoodProps {
	setIsOpen: () => void;
	isOpen: boolean;
	handleAddFood: (food: FoodProps[]) => Promise<void>;
}

export function ModalAddFood({
	setIsOpen,
	handleAddFood,
	isOpen,
}: ModalAddFoodProps) {
	const formRef = useRef() as RefObject<FormHandles>;

	const handleSubmit = async (data: FoodProps[]) => {
		handleAddFood(data);
		setIsOpen();
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Form ref={formRef} onSubmit={handleSubmit}>
				<h1>Novo Prato</h1>
				<Input name="image" placeholder="Cole o link aqui" icon="" />

				<Input name="name" placeholder="Ex: Moda Italiana" icon="" />
				<Input name="price" placeholder="Ex: 19.90" icon="" />

				<Input name="description" placeholder="Descrição" icon="" />
				<button type="submit" data-testid="add-food-button">
					<p className="text">Adicionar Prato</p>
					<div className="icon">
						<FiCheckSquare size={24} />
					</div>
				</button>
			</Form>
		</Modal>
	);
}
