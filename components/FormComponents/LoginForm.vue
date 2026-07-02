<template>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-slot="$form"
      :initial-values
      :resolver
      :validate-on-value-update="false"
      :validate-on-blur="false"
      :validate-on-mount="false"
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

<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import type { FormSubmitEvent } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';
import type { LoginForm } from '~/types/forms';

const toast = useToast();
const authStore = useAuthStore();
// const { loginUser } = authStore;

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

// PrimeVue FormSubmitEvent expects Record<string, any>.
// The Form component is not generic, so we cast e.values to LoginForm.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onFormSubmit = async (e: FormSubmitEvent<Record<string, any>>) => {
  // e.originalEvent: Represents the native form submit event.
  // e.valid: A boolean that indicates whether the form is valid or not.
  // e.states: Contains the current state of each form field, including validity status.
  // e.errors: An object that holds any validation errors for the invalid fields in the form.
  // e.values: An object containing the current values of all form fields.
  // e.reset: A function that resets the form to its initial state.

  try {
    if (e.values) {
      const values = e.values as LoginForm;
      const response = await authStore.loginUser(values);
      if (response) {
        toast.add({
          severity: 'success',
          summary: 'Login successful',
          life: 3000,
        });
        navigateTo('/');
      } else {
        throw new Error('Login failed: no token returned');
      }
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    toast.add({
      severity: 'error',
      summary: 'Login failed',
      detail: message,
      life: 3000,
    });
  }
};
</script>
