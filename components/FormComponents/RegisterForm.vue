<template>
  <div class="card flex justify-center">
    <Toast />
    <Form 
      :initialValues="initialValues" 
      :resolver="resolver" 
      @submit="onFormSubmit" 
      class="flex flex-col gap-4 w-full sm:w-80"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <InputText type="email" placeholder="Email" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="firstName" class="flex flex-col gap-1">
        <InputText type="text" placeholder="First Name" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="lastName" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Last Name" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
        <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="details" class="flex flex-col gap-1">
        <Textarea placeholder="Details" />
        <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useRegistration } from '@/composables/registration'

const { isRegistrationSuccess, setRegistrationValue } = useRegistration();

const toast = useToast();

const initialValues = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  details: ''
});

const resolver = zodResolver(
  z.object({
    email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email is not valid.' }),
    firstName: z.string().min(1, { message: 'First name is required.' }),
    lastName: z.string().min(1, { message: 'Last name is required.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
    details: z.string().min(1, { message: 'Details are required.' })
  })
);

const onFormSubmit = ({ valid, errors, values }) => {

    console.log('Form Values:', values);
   if (valid) {
    setRegistrationValue(values);
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 });
  } else {
    toast.add({ severity: 'error', summary: 'Form has errors.', detail: JSON.stringify(errors), life: 3000 });
  }
};
</script>
