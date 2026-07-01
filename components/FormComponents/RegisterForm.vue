<template>
  <div class="card flex justify-center">
    <Toast />
    <Form
      :initial-values="initialValues"
      :resolver="resolver"
      class="flex flex-col gap-4 w-full sm:w-80"
      @submit="onFormSubmit"
    >
      <FormField v-slot="$field" name="email" class="flex flex-col gap-1">
        <InputText type="email" placeholder="Email" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="firstName" class="flex flex-col gap-1">
        <InputText type="text" placeholder="First Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="lastName" class="flex flex-col gap-1">
        <InputText type="text" placeholder="Last Name" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="password" class="flex flex-col gap-1">
        <Password
          type="text"
          placeholder="Password"
          :feedback="false"
          toggle-mask
          fluid
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="details" class="flex flex-col gap-1">
        <Textarea placeholder="Details" />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $field.error?.message }}
        </Message>
      </FormField>

      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import type { FormSubmitEvent } from '@primevue/forms';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth';
import { navigateTo } from '#app';
import type { RegistrationForm } from '~/types/forms';

const toast = useToast();

const authStore = useAuthStore();

const initialValues = reactive({
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  details: '',
});

const resolver = zodResolver(
  z.object({
    email: z
      .string()
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: 'Email is not valid.' }),
    firstName: z
      .string()
      .min(2, { message: 'First name must contain at least 2 characters.' })
      .max(30, { message: 'First name must contain at most 30 characters.' }),
    lastName: z
      .string()
      .min(2, { message: 'Last name must contain at least 2 characters.' })
      .max(30, { message: 'Last name must contain at most 30 characters.' }),
    password: z
      .string()
      .min(5, { message: 'Password must contain at least 5 characters.' })
      .max(20, { message: 'Password must be at most 20 characters.' }),
    details: z
      .string()
      .min(1, { message: 'Details must contain at least 1 characters.' })
      .max(200, { message: 'Details must contain at most 200 characters.' }),
  })
);

// PrimeVue FormSubmitEvent expects Record<string, any>.
// The Form component is not generic, so we cast e.values to LoginForm.

const onFormSubmit = async ({
  valid,
  values,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: FormSubmitEvent<Record<string, any>>) => {
  try {
    if (!valid) return;
    const form = values as RegistrationForm;
    await authStore.registrationUser(form);
    toast.add({
      severity: 'success',
      summary: 'Registration successful',
      life: 3000,
    });
    navigateTo('/login');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    toast.add({
      severity: 'error',
      summary: 'Registration Error',
      detail: message,
      life: 3000,
    });
  }
};
</script>
