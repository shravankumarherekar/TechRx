import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Steps, message, type StepProps } from 'antd';
import { type FC } from 'react';
import { FormRules } from '../../helpers';
import { useSteps } from '../../hooks';
import './signupForm.scss';
import { useLanguages } from './useLanguages';

interface SignupFormSchema {
	name: string;

	email: string;

	password: string;

	languages: Array<{ code: string; name: string }>;

	address: {
		city: string;
	};
}

const setDisplayIcon = (visible: boolean): JSX.Element =>
	visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

const { useForm } = Form;

const stepItems: StepProps[] = [
	{
		title: 'Basic Details',
	},
	{
		title: 'Address',
	},
];

export const SignupForm: FC = () => {
	const [form] = useForm<SignupFormSchema>();
	const [languages] = useLanguages();
	const step = useSteps(0, stepItems.length);

	const [onNextBtnClick, onPrevBtnClick] = [step.next, step.prev];

	const submitHandler = async (): Promise<void> => {
		const value = form.getFieldsValue(true);
		await message.success('Successful', 1);
	};

	return (
		<>
			<Steps current={step.current} items={stepItems} />
			<Form
				className="signup-form"
				layout="vertical"
				form={form}
				preserve
				onFinish={() => {
					void submitHandler();
				}}
			>
				{step.current === 0 && (
					<>
						<Form.Item required name="name" label="Full Name" rules={[FormRules.required]}>
							<Input placeholder="enter your full name" />
						</Form.Item>

						<Form.Item
							required
							name="email"
							label="Email"
							rules={[FormRules.required, FormRules.email]}
						>
							<Input placeholder="enter your email" />
						</Form.Item>

						<Form.Item required name={'password'} label="Password" rules={[FormRules.password]}>
							<Input.Password
								htmlSize={12}
								placeholder="enter your password"
								iconRender={setDisplayIcon}
							/>
						</Form.Item>

						<Form.Item required name="languages" label="Languages" rules={[FormRules.required]}>
							<Select
								options={languages}
								mode="multiple"
								clearIcon
								placeholder="select from below languages"
							/>
						</Form.Item>
					</>
				)}

				{step.current === 1 && (
					<>
						<Space className="combined-field" direction="horizontal">
							<Form.Item
								required
								name={['address', 'city']}
								label="City"
								rules={[FormRules.required]}
							>
								<Input placeholder="enter city name eg: London" />
							</Form.Item>

							<Form.Item
								required
								name={['address', 'state']}
								label="State"
								rules={[FormRules.required]}
							>
								<Input placeholder="enter city name eg: London" />
							</Form.Item>
						</Space>
						<Form.Item required name={['address', 'country']} label="Country">
							<Input placeholder="India" />
						</Form.Item>

						<Form.Item
							required
							name={['address', 'landmark']}
							label="Landmark"
							rules={[FormRules.required]}
						>
							<Input.TextArea placeholder="Type Here..." rows={2} />
						</Form.Item>
					</>
				)}

				{step.current < stepItems.length - 1 && (
					<Button
						htmlType="submit"
						type="primary"
						property="submit"
						size="large"
						onClick={onNextBtnClick}
					>
						Next
					</Button>
				)}

				{step.isLast && (
					<Button type="primary" htmlType="submit" size="large">
						Submit
					</Button>
				)}

				{!step.isFirst && (
					<Button
						size="large"
						type="dashed"
						style={{ marginLeft: '1rem' }}
						onClick={onPrevBtnClick}
					>
						Prev
					</Button>
				)}
			</Form>
		</>
	);
};
