<template>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-slot="$form"
      :initial-values
      :resolver
      class="flex flex-col gap-4 w-full sm:w-60"
      @submit="onFormSubmit"
    >
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="Email" fluid />
        <Message
          v-if="$form.email?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.email.error.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          placeholder="Password"
          :feedback="false"
          toggle-mask
          fluid
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          <ul class="my-0 px-4 flex flex-col gap-1">
            <li v-for="(error, index) of $form.password.errors" :key="index">
              {{ error.message }}
            </li>
          </ul>
        </Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';

const toast = useToast();
const authStore = useAuthStore();
const { loginUser } = authStore;

const initialValues = ref({
  email: '',
  password: '',
});

const resolver = zodResolver(
  z.object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email is not valid.' }),
    password: z
      .string()
      .min(5, { message: 'Minimum 5 characters.' })
      .max(20, { message: 'Maximum 20 characters.' })
      .refine((value) => /[a-z]/.test(value), {
        message: 'Must have a lowercase letter.',
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: 'Must have an uppercase letter.',
      })
      .refine((value) => /\d/.test(value), {
        message: 'Must have a number.',
      }),
  })
);

const onFormSubmit = async (e) => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.

  try {
    if (e.valid) {
      const response = await loginUser(e.values);

      if (response) {
        console.log('loginform-response', response);
        toast.add({
          severity: 'success',
          summary: 'Login successful',
          life: 3000,
        });
        // checkToken()
        navigateTo('/');
      } else {
        console.log('loginForm-response');

        throw new Error('Login failed: no token returned');
      }
    }
  } catch (error) {
    console.log('loginForm-catch', error);

    toast.add({
      severity: 'error',
      summary: 'Login failed',
      detail: error.message || error,
      life: 3000,
    });
  }
};
</script>
