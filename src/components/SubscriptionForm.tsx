import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { getZodiacSign } from '../utils/zodiac';
import './subscriptionForm.css';
import zodiacIcons from '../utils/zodiacIcons';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '../validation/validationSchema';
import * as yup from 'yup';
import FormInputGroup from './FormInputGroup';
import BottomSnackbar from './Snackbar';

interface Inputs extends yup.InferType<typeof schema> {}

function SubscriptionForm() {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (open: any) => {
    setOpen(open);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  const selectedDate = watch('date');

  const zodiac = useMemo(() => {
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      return getZodiacSign(dateObj.getMonth() + 1, dateObj.getDate());
    }
    return '';
  }, [selectedDate]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setOpen(true);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const ZodiacIcon = useMemo(() => zodiacIcons[zodiac], [zodiac]);

  return (
    <div className="card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputGroup
          label="Name"
          id="name"
          register={register}
          error={errors.name}
        />
        <FormInputGroup
          label="Email"
          id="email"
          register={register}
          error={errors.email}
        />
        <FormInputGroup
          label="Time of Day for Delivery"
          id="time"
          type="time"
          register={register}
          error={errors.time}
        />
        <FormInputGroup
          label="Date of Birth"
          id="date"
          type="date"
          register={register}
          error={errors.date}
          errorMessage="Date of birth is required"
        />
        {zodiac && (
          <div className="zodiac-group">
            <div className="zodiac-wrapper">
              Zodiac Sign: {zodiac}
              <span className="zodiac-icon">
                {ZodiacIcon && <ZodiacIcon />}
              </span>
            </div>
          </div>
        )}
        <button className="submit-button">Subscribe</button>
      </form>
      <BottomSnackbar isOpen={isOpen} handleOpen={handleOpen} />
    </div>
  );
}

export default SubscriptionForm;
