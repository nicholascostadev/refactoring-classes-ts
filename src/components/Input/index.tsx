import { useEffect, useRef, useState, useCallback, RefObject } from 'react';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	icon: any;
}

export const Input = ({ name, icon: Icon, ...rest }: InputProps) => {
	const inputRef = useRef(null) as RefObject<HTMLInputElement>;

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const [isFilled, setIsFilled] = useState<boolean>(false);

	const { fieldName, defaultValue, registerField } = useField(name);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);

		setIsFilled(!!inputRef.current?.value);
	}, []);

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: inputRef.current,
			path: 'value',
		});
	}, [fieldName, registerField]);

	return (
		<Container isFilled={isFilled} isFocused={isFocused}>
			{Icon && <Icon size={20} />}

			<input
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				defaultValue={defaultValue}
				ref={inputRef}
				{...rest}
			/>
		</Container>
	);
};

export default Input;
