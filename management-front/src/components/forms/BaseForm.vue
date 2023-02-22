<template>
  <div class="form-schema">
    <div class="grid gap-4 mb-5">
      <template v-if="parsedTemplate.length > 0">
        <div
          v-for="(item, itemIndex) in parsedTemplate"
          :key="itemIndex"
          :class="item.colClass || 'col-span-12'">
          <template v-if="item.type == 'slot'">
            <slot :name="item.model" />
          </template>
          <template v-else>
            <div :class="`${item.overrideGroupClass ? '' : 'relative'} ${item.groupClass ?? ''}`">
              <label
                v-if="
                  ['text', 'email', 'password', 'number', 'select', 'textarea'].includes(
                    item.type
                  ) && item.label
                "
                :for="`input-${itemIndex}`"
                :class="`${
                  !item.overrideLabelClass ? 'block text-sm font-medium text-gray-700' : ''
                } ${item.labelClass ?? ''}`">
                <span v-html="item.label"></span>
                <span
                  v-if="item.validate && item.validate.required && item.validate.requiredIndicator"
                  class="text-red-500 font-medium pl-1"
                  >*</span
                >
              </label>
              <template v-if="['text', 'email', 'password', 'number'].includes(item.type)">
                <template v-if="item.masks">
                  <input
                    type="tel"
                    :id="`input-${itemIndex}`"
                    :class="`${
                      item.overrideInputClass
                        ? ''
                        : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm'
                    } ${item.inputClass ?? ''} ${
                      v$.form[item.model].$error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`"
                    v-model="v$.form[item.model].$model"
                    :placeholder="item.placeholder"
                    :min="item.min"
                    :max="item.max"
                    v-on="
                      item.event?.type
                        ? { [item.event.type]: eventCallback($event, item.event.fn) }
                        : {}
                    "
                    v-mask="item.masks" />
                </template>
                <template v-else>
                  <input
                    :type="item.type"
                    :id="`input-${itemIndex}`"
                    :class="`${
                      item.overrideInputClass
                        ? ''
                        : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm'
                    } ${item.inputClass ?? ''} ${
                      v$.form[item.model].$error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`"
                    v-model="v$.form[item.model].$model"
                    :placeholder="item.placeholder"
                    :min="item.min"
                    :max="item.max"
                    v-on="
                      item.event?.type
                        ? { [item.event.type]: eventCallback($event, item.event.fn) }
                        : {}
                    " />
                </template>
              </template>
              <template v-else-if="item.type == 'select'">
                <select
                  :id="`input-${itemIndex}`"
                  :class="`${
                    item.overrideInputClass
                      ? ''
                      : 'mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm'
                  } ${item.inputClass} ${
                    v$.form[item.model].$error
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`"
                  v-model="v$.form[item.model].$model"
                  v-on="
                    item.event?.type
                      ? { [item.event.type]: eventCallback($event, item.event.fn) }
                      : {}
                  ">
                  <option
                    v-for="(option, optionIndex) in item.options"
                    :key="optionIndex"
                    :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </template>
              <template v-else-if="item.type == 'textarea'">
                <textarea
                  :id="`input-${itemIndex}`"
                  :class="`${
                    item.overrideInputClass
                      ? ''
                      : 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm'
                  } ${item.inputClass ?? ''} ${
                    v$.form[item.model].$error
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                      : ''
                  }`"
                  v-model="v$.form[item.model].$model"
                  :placeholder="item.placeholder"
                  :rows="item.rows"
                  v-on="
                    item.event?.type
                      ? { [item.event.type]: eventCallback($event, item.event.fn) }
                      : {}
                  "></textarea>
              </template>
              <template v-else-if="item.type == 'checkbox'">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    :class="`${
                      item.overrideInputClass
                        ? ''
                        : 'h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500'
                    } ${item.inputClass ?? ''} ${
                      v$.form[item.model].$error
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : ''
                    }`"
                    v-model="v$.form[item.model].$model"
                    :value="item.value"
                    :id="`checkbox-${itemIndex}`"
                    v-on="
                      item.event?.type
                        ? { [item.event.type]: eventCallback($event, item.event.fn) }
                        : {}
                    " />
                  <label
                    :class="`${
                      item.overrideLabelClass ? '' : 'ml-3 block text-sm font-medium text-gray-700'
                    } ${item.labelClass ?? ''}`"
                    :for="`checkbox-${itemIndex}`">
                    {{ item.label }}
                    <span
                      v-if="
                        item.validate && item.validate.required && item.validate.requiredIndicator
                      "
                      class="text-danger fw-bolder"
                      >*</span
                    >
                  </label>
                </div>
              </template>
              <template v-else-if="item.type == 'radio'">
                <div
                  v-for="(option, optionIndex) in item.options"
                  :key="optionIndex"
                  class="flex items-center"
                  :class="{ 'form-check-inline': item.inline }">
                  <input
                    type="radio"
                    :class="`${
                      item.overrideInputClass
                        ? ''
                        : 'h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-500'
                    }`"
                    v-model="v$.form[item.model].$model"
                    :value="option.value"
                    :checked="option.checked"
                    :id="`radio-${itemIndex}-${optionIndex}`"
                    v-on="
                      item.event?.type
                        ? { [item.event.type]: eventCallback($event, item.event.fn) }
                        : {}
                    " />
                  <label
                    :class="`${
                      item.overrideLabelClass ? '' : 'ml-3 block text-sm font-medium text-gray-700'
                    } ${option.labelClass ?? ''}`"
                    :for="`radio-${itemIndex}-${optionIndex}`">
                    {{ option.text }}
                  </label>
                </div>
              </template>
              <template v-if="item.validate">
                <div
                  class="text-red-500 font-medium text-sm"
                  v-for="error of v$.form[item.model].$errors"
                  :key="error.$uid">
                  {{ error.$message }}
                </div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </div>
    <slot name="action" :callback="submit"></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseForm',
};
</script>
<script setup lang="ts">
export interface IDynamicObject {
  [key: string]: string | number | boolean | object | null;
}

export type ICallback = () => IDynamicObject | null;

export interface IBaseFormItem {
  model: string;
  type: string;
  placeholder?: string;
  min?: number;
  max?: number;
  label?: string;
  labelClass?: string;
  overrideLabelClass?: boolean;
  inputClass?: string;
  overrideInputClass?: boolean;
  inline?: boolean;
  colClass?: string;
  groupClass?: string;
  overrideGroupClass?: boolean;
  masks?: string[];
  rows?: number;
  options?: Array<{
    text: string;
    value: string | number;
    checked?: boolean;
    selected?: boolean;
    labelClass?: string;
  }>;
  value?: string | number | boolean;
  event?: {
    type: string;
    fn: () => IDynamicObject;
  };
  validate?: {
    required?: boolean;
    requiredMessage?: string;
    requiredIndicator?: boolean;
    email?: boolean;
    emailMessage?: string;
    url?: boolean;
    urlMessage?: string;
    minLength?: number;
    minLengthMessage?: string;
    maxLength?: number;
    maxLengthMessage?: string;
    minValue?: number;
    minValueMessage?: string;
    maxValue?: number;
    maxValueMessage?: string;
    sameAs?: string;
    sameAsMessage?: string;
    requiredIf?: boolean;
    requiredIfMessage?: string;
    requiredIfFn?: () => boolean;
    custom?: boolean;
    customMessage?: string;
    customFn?: () => boolean;
  };
}

import _ from 'lodash';
import { reactive, watch, computed } from 'vue';
import useVuelidate, {
  ValidationRuleWithParams,
  ValidationRuleWithoutParams,
} from '@vuelidate/core';
import {
  required,
  email,
  url,
  minLength,
  maxLength,
  minValue,
  maxValue,
  requiredIf,
  helpers,
} from '@vuelidate/validators';

interface IProps {
  template: Array<IBaseFormItem>;
  update?: IDynamicObject;
  disableNestedSubmit?: boolean;
}

interface IRules {
  required?: ValidationRuleWithoutParams | ValidationRuleWithParams;
  email?: ValidationRuleWithoutParams | ValidationRuleWithParams;
  url?: ValidationRuleWithoutParams | ValidationRuleWithParams;
  minLength?:
    | ValidationRuleWithoutParams
    | ValidationRuleWithParams
    | ValidationRuleWithParams<{ min: number }>;
  maxLength?:
    | ValidationRuleWithoutParams
    | ValidationRuleWithParams
    | ValidationRuleWithParams<{ max: number }>;
  minValue?:
    | ValidationRuleWithoutParams
    | ValidationRuleWithParams
    | ValidationRuleWithParams<{ min: number }>;
  maxValue?:
    | ValidationRuleWithoutParams
    | ValidationRuleWithParams
    | ValidationRuleWithParams<{ max: number }>;
  sameAs?: ((value: string) => boolean) | ValidationRuleWithParams;
  requiredIf?: ValidationRuleWithoutParams | ValidationRuleWithParams;
  custom?: (() => boolean) | ValidationRuleWithoutParams | ValidationRuleWithParams;
}

const props = defineProps<IProps>();
let form = reactive<IDynamicObject>({});
const rules = reactive({ form: {} });

watch(
  () => props.update,
  (update, prevUpdate) => {
    if (update) {
      const entries = Object.entries(update);
      if (entries.length > 0) {
        for (const [key, value] of entries) {
          form[key] = value;
        }
      }
    }
  },
  { deep: true, immediate: true }
);

const customSameAs =
  (param: { target: string; form: IDynamicObject }) =>
  (value: string): boolean => {
    const i = param.target;

    return param.form && value === param.form[i];
  };

watch(
  () => props.template,
  (template, prevTemplate) => {
    template
      .filter((item) => item.type !== 'slot')
      .map((item) => {
        let value = null;

        if (props.update && props.update[item.model]) {
          value = props.update[item.model];
        } else if (item.value) {
          value = item.value;
        }

        form[item.model] = form[item.model] ?? value;

        const rule: IRules = {};

        if (item.validate) {
          //required
          if (item.validate.required) {
            if (['string', 'undefined'].includes(typeof item.validate.requiredIndicator)) {
              item.validate.requiredIndicator = true;
            }

            const requiredMessage = item.validate.requiredMessage ?? 'Required';

            rule.required = helpers.withMessage(requiredMessage, required);
          }

          //email
          if (item.validate.email) {
            const emailMessage = item.validate.emailMessage ?? 'This is not a valid email address';

            rule.email = helpers.withMessage(emailMessage, email);
          }

          //url
          if (item.validate.url) {
            const urlMessage = item.validate.urlMessage ?? 'This is not a valid URL';

            rule.url = helpers.withMessage(urlMessage, url);
          }

          if (item.validate.sameAs) {
            const sameAsMessage =
              item.validate.sameAsMessage ??
              `This field must be the same as ${item.validate.sameAs}`;

            rule.sameAs = helpers.withMessage(
              sameAsMessage,
              customSameAs({
                form,
                target: item.validate.sameAs,
              })
            );
          }

          //minLength
          if (item.validate.minLength) {
            const minLengthMessage =
              item.validate.minLengthMessage ??
              `At least ${item.validate.minLength} characters are required`;

            rule.minLength = helpers.withMessage(
              minLengthMessage,
              minLength(item.validate.minLength)
            );
          }

          //maxLength
          if (item.validate.maxLength) {
            const maxLengthMessage =
              item.validate.maxLengthMessage ??
              `Less than ${item.validate.maxLength} characters required`;

            rule.maxLength = helpers.withMessage(
              maxLengthMessage,
              maxLength(item.validate.maxLength)
            );
          }

          //minValue
          if (item.validate.minValue) {
            const minValueMessage =
              item.validate.minValueMessage ?? `Needs to be greater than ${item.validate.minValue}`;

            rule.minValue = helpers.withMessage(minValueMessage, minValue(item.validate.minValue));
          }

          //maxValue
          if (item.validate.maxValue) {
            const maxValueMessage =
              item.validate.maxValueMessage ?? `Needs to be less than ${item.validate.maxValue}`;

            rule.maxValue = helpers.withMessage(maxValueMessage, maxValue(item.validate.maxValue));
          }

          //requiredIf
          if (item.validate.requiredIf && item.validate.requiredIfFn) {
            const requiredIfMessage = item.validate.requiredIfMessage ?? 'Required';

            rule.required = helpers.withMessage(
              requiredIfMessage,
              requiredIf(item.validate.requiredIfFn)
            );
          }

          //custom
          if (item.validate.custom && item.validate.customFn) {
            if (item.validate.customMessage) {
              rule.custom = helpers.withMessage(
                item.validate.customMessage,
                item.validate.customFn
              );
            } else {
              rule.custom = item.validate.customFn;
            }
          }
        }

        rules.form = {
          ...rules.form,
          [item.model]: rule,
        };
      });
  },
  { immediate: true }
);

const parsedTemplate = computed(() => {
  return props.template.map((item) => {
    if (!item.event || !item.event.type) {
      item.event = {
        type: '',
        fn: () => {
          return {};
        },
      };
    }

    item.inputClass = item.inputClass ?? '';
    item.labelClass = item.labelClass ?? '';

    if (['radio', 'select'].indexOf(item.type) > -1) {
      item.options = item.options ?? [];

      const someoneSelected = item.options.find((o) => o.checked || o.selected);

      if (someoneSelected) {
        form = {
          ...form,
          [item.model]: someoneSelected.value,
        };
      }
    }

    return item;
  });
});

const submit: ICallback = () => {
  v$.value.form.$touch();

  if (!v$.value.form.$invalid) {
    if (!props.disableNestedSubmit) {
      let parsedForm = {};
      const formEntries = Object.entries(form);

      if (formEntries.length) {
        for (const [key, value] of formEntries) {
          parsedForm = { ...setValueToObject(parsedForm, key, value) };
        }
      }

      return parsedForm;
    }

    return form;
  }

  return null;
};

const eventCallback = async (
  event: string,
  callback: (event: string, form: IDynamicObject) => IDynamicObject
) => {
  const response = await callback(event, form);

  if (typeof response === 'object') {
    form = response;
  }
};

const setValueToObject = (
  object: IDynamicObject,
  string: string,
  value: string | number | boolean | null | object
) => {
  const tmp = { ...object };
  const dottedString = string
    .replace(/([a-z0-9])([A-Z])/g, '$1.$2')
    .toString()
    .toLowerCase();

  _.set(tmp, dottedString, value);

  return tmp;
};

const v$ = useVuelidate(rules, { form });
</script>

<style lang="scss" scoped></style>
