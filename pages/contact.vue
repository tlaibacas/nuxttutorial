<style>
@import "../assets/styles/contact.css";
</style>

<script setup>
import { useContactForm } from "../utils/contactForm.js";

const { form, submitForm } = useContactForm();
</script>

<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-6">
          <v-card-title class="text-h3 mb-4">Contact Us</v-card-title>

          <v-form @submit.prevent="submitForm">
            <v-text-field
              v-model="form.name"
              label="Name"
              :rules="[(v) => !!v || 'Name is required']"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              label="Email"
              type="email"
              :rules="[
                (v) => !!v || 'Email is required',
                (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
              ]"
              required
              class="mb-4"
            ></v-text-field>

            <v-textarea
              v-model="form.message"
              label="Message"
              :rules="[(v) => !!v || 'Message is required']"
              required
              rows="4"
              class="mb-4"
            ></v-textarea>

            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              variant="flat"
            >
              Send Message
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
