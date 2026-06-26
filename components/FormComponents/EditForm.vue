<template>
  <div class="card flex justify-center">
    <Toast />

    <Form
      v-if="isReadyInfo"
      v-slot="$form"
      :initial-values="initialValues"
      :resolver
      :validate-on-value-update="false"
      :validate-on-blur="true"
      :validate-on-mount="['firstName']"
      class="flex flex-col gap-4 w-full sm:w-56"
      @submit="onFormSubmit"
    >
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="email" fluid />
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
        <InputText
          name="firstName"
          type="text"
          placeholder="First Name"
          fluid
        />
        <Message
          v-if="$form.firstName?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.firstName.error.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="lastName" type="text" placeholder="Last Name" fluid />
        <Message
          v-if="$form.lastName?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.lastName.error.message }}
        </Message>
      </div>
      <div class="flex flex-col gap-1">
        <Textarea name="details" placeholder="Details" />
        <Message
          v-if="$form.details?.invalid"
          severity="error"
          size="small"
          variant="simple"
        >
          {{ $form.details.error.message }}
        </Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { navigateTo } from '#app';

const authStore = useAuthStore();
const { userInfo } = storeToRefs(authStore);

const toast = useToast();

const isReadyInfo = computed(() => !!userInfo.value.email);

const initialValues = computed(() => ({
  email: userInfo.value.email,
  firstName: userInfo.value.firstName,
  lastName: userInfo.value.lastName,
  details: userInfo.value.details,
}));

const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: 'Email is required.' }];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = [{ message: 'Invalid email format.' }];
  }

  if (!values.firstName) {
    errors.firstName = [{ message: 'First name is required.' }];
  } else if (values.firstName.length < 2 || values.firstName.length > 30) {
    errors.firstName = [
      { message: 'First name must be between 2 and 30 characters.' },
    ];
  }

  if (!values.lastName) {
    errors.lastName = [{ message: 'Last name is required.' }];
  } else if (values.lastName.length < 2 || values.lastName.length > 30) {
    errors.lastName = [
      { message: 'Last name must be between 2 and 30 characters.' },
    ];
  }

  if (!values.details) {
    errors.details = [{ message: 'Details is required.' }];
  } else if (values.details && values.details.length > 200) {
    errors.details = [{ message: 'Details must be up to 200 characters.' }];
  }

  return {
    errors,
  };
};

const onFormSubmit = async ({ valid, states }) => {
  if (!valid) return;

  const values = {
    email: states.email.value,
    firstName: states.firstName.value,
    lastName: states.lastName.value,
    details: states.details.value,
  };
  const res = await authStore.updateUserData(values);
  if (res) {
    navigateTo(`/profile/${userInfo.value.firstName}`);
    toast.add({
      severity: 'success',
      summary: 'Form is submitted.',
      life: 3000,
    });
  }
};
</script>
