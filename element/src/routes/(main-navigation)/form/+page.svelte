<script lang="ts">
  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    Button,
  } from '$lib/button/index.js'

  import {
    CheckboxSwitch,
  } from '$lib/checkbox-switch/index.js'

  import {
    countryConfigGenerator,
    DropdownSearch,
  } from '$lib/dropdown-search/index.js'

  import {
    preparePushExtraCharactersToNext,
  } from '$lib/input/index.js'

  import {
    NumberInput,
  } from '$lib/number-input/index.js';

  import {
    TextDisplay,
  } from '$lib/text-display/index.js';

  import {
    TextInput,
    TextInputWrapped,
  } from '$lib/text-input/index.js';

  import { addressLine1Config } from './config/address-line1.js'
  import { cityConfig } from './config/city.js'
  import { firstNameConfig } from './config/first-name.js'
  import { havePetsConfig } from './config/have-pets.js'
  import { lastNameConfig } from './config/last-name.js'
  import { titleConfig } from './config/title.js'
  import { zipCodeConfig } from './config/zip-code.js'

  interface UserData {
    title: string;
    firstName: string;
    lastName: string;
    age: number | '';
    addressLine1: string;
    addressLine2?: string;
    city: string;
    zipCode: string;
    country: string;
    dateOfBirth: Date | null;
    havePets: boolean | null;
    challenge: number | '';
  }

  const emptyData : UserData = {
    title: '',
    firstName: '',
    lastName: '',
    age: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    country: '',
    dateOfBirth: null,
    havePets: null,
    challenge: '',
  }

  let data : UserData = $state({...emptyData})

  const allowedKeys: string[] = [],
    allowedSeparators = [';'],
    onInput = preparePushExtraCharactersToNext(allowedKeys, allowedSeparators)

</script>
<GridContainer>
  <GridLine>
    <span class="grid-span-12">
      Collected data
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">
      Name:
    </span>
    <span class="grid-span-9">
      <TextDisplay mask="$(text) $(text) $(text) ($(number))" value={[data.title, data.firstName, data.lastName, data.age]} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">
      Address:
    </span>
    <span class="grid-span-9">
      <TextDisplay value={data.addressLine1} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-9 grid-start-4">
      <TextDisplay value={data.addressLine2} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-9 grid-start-4">
      <TextDisplay mask="$(text) $(text), $(text)" value={[data.zipCode, data.city, data.country]} />
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">
      Do you havew pets?:
    </span>
    <span class="grid-span-9 grid-start-4">
      {(data.havePets) ? 'YES' : 'No'}
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">
      Challenge value:
    </span>
    <span class="grid-span-9 grid-start-4">
      <TextDisplay value={data.challenge} />
    </span>
  </GridLine>
  <form>
    <GridLine>
      <span class="grid-span-2">Title</span>
      <span><DropdownSearch {onInput} bind:value={data.title} {...titleConfig} allowedSeparators={[',']} /></span>
      <span class="grid-span-2">Name</span>
      <span class="grid-span-3">
        <TextInputWrapped {onInput} bind:value={data.firstName} {...firstNameConfig} allowedSeparators={[',']}/>
      </span>
      <span class="grid-span-3">
        <TextInputWrapped {onInput} bind:value={data.lastName} {...lastNameConfig} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-2">Age</span>
      <span class="grid-span-6">
        <NumberInput {allowedSeparators} bind:value={data.age} isCopyButtonEnabled={false} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-2">Address</span>
      <span class="grid-span-6">
        <TextInputWrapped {onInput} bind:value={data.addressLine1} {...addressLine1Config} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-6 grid-start-3">
        <TextInputWrapped {onInput} bind:value={data.addressLine2} placeholder="Address line 2" />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-2 grid-start-3">
        <TextInputWrapped {onInput} bind:value={data.zipCode} {...zipCodeConfig} />
      </span>
      <span class="grid-span-4">
        <TextInputWrapped {onInput} bind:value={data.city} {...cityConfig} />
      </span>
      <span class="grid-span-3">
        <DropdownSearch {onInput} bind:value={data.country} {...countryConfigGenerator()} />
      </span>
    </GridLine>
    <GridLine>
      <span class="grid-span-3">Do you have pets?</span>
      <span class="grid-span-3"><CheckboxSwitch {onInput} bind:value={data.havePets} {...havePetsConfig}/></span>
    </GridLine>
    <GridLine>
      <span class="grid-span-3">Challenge: 7 / 4 = ?</span>
      <span class="grid-span-6"><NumberInput fractionDigits=2  isCopyButtonEnabled={false} bind:value={data.challenge}/></span>
    </GridLine>
  </form>
  <GridLine>
    <span class="grid-span-3">Values to Copy and Paste:</span>
    <span class="grid-span-9"><Button label="Clear Data" onClick={() => data = {...emptyData}}/></span>
  </GridLine>
  <GridLine>
    <span class="grid-span-9 grid-start-4">Mr.;Test;Subject;26;345. That one at the end of the city;;BE123456;Berlin;DE;1;1,95</span>
  </GridLine>
</GridContainer>