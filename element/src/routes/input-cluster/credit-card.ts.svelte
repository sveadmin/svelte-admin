<script lang="ts">
  import {
    createFieldValidator,
    equalLengthValidator,
    lessThanOrEqualValidator,
    rune,
  } from '@sveadmin/common'

  import {
    focusNext,
    focusPrevious,
  } from '$lib/helper/index.js'

  import {
    GridContainer,
    GridLine,
  } from '$lib/grid/index.js'

  import {
    KEY_DOWN_UNMATCHED,
    TEXT_INPUT_TYPE_TEXT,
  } from '$lib/types.js'

  import {
    TEXT_DISPLAY_TYPE_LITERAL,
  } from '$lib/literal/types.js'

  import {
    InputCluster,
    prepareParsePatedValue,
    preparePushExtraCharactersToNext,
    preventRepeat,
  } from '$lib/input-cluster/index.js'

  import type {
    InputClusterParts,
  } from '$lib/input-cluster/index.js'
  
  let boundValue: string[] = $state(['', '', '', '', ''])

  const allowedInputKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const inputLength = [4, 4, 4, 4]

  const parsePastedValue = prepareParsePatedValue(
    rune(boundValue),
    allowedInputKeys,
    inputLength
  )

  const continueOnKeydown = () => true

  const keyMap = {
    '_-': (event: KeyboardEvent) => {focusNext(event.target as HTMLInputElement); event.preventDefault()},
    '_ArrowLeft': continueOnKeydown,
    '_ArrowRight': continueOnKeydown,
    '_Ctrl+ArrowLeft': continueOnKeydown,
    '_Ctrl+ArrowRight': continueOnKeydown,
    '_Ctrl+Shift+ArrowLeft': continueOnKeydown,
    '_Ctrl+Shift+ArrowRight': continueOnKeydown,
    '_Shift+ArrowLeft': continueOnKeydown,
    '_Shift+ArrowRight': continueOnKeydown,
    '_Backspace': continueOnKeydown,
    '_Delete': continueOnKeydown,
    '_End': continueOnKeydown,
    '_Home': continueOnKeydown,
    '_Tab': continueOnKeydown,
    '_Shift+Tab': continueOnKeydown,
    '_Ctrl+a': continueOnKeydown,
    '_Ctrl+A': continueOnKeydown,
    '_Ctrl+c': continueOnKeydown,
    '_Ctrl+C': continueOnKeydown,
    '_Ctrl+v': parsePastedValue,
    '_Ctrl+V': parsePastedValue,
    '_Ctrl+Insert': continueOnKeydown,
    '_Shift+Insert': parsePastedValue,
    '_*+F1': continueOnKeydown,
    '_*+F2': continueOnKeydown,
    '_*+F3': continueOnKeydown,
    '_*+F4': continueOnKeydown,
    '_*+F5': continueOnKeydown,
    [KEY_DOWN_UNMATCHED]: (event: KeyboardEvent) => event.preventDefault()
  }

  const pushExtraCharactersToNext = preparePushExtraCharactersToNext(rune(boundValue), 4)

  allowedInputKeys.map(character => {
    keyMap['_' + character] = preventRepeat
    keyMap[character] = pushExtraCharactersToNext
  })

  const onKeydown = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement
    if (event.key === 'Backspace'
      && target.selectionStart === 0
      && target.selectionEnd === 0) {
      event.preventDefault()
      focusPrevious(target)
    }
    if (event.key === 'ArrowLeft'
      && !event.shiftKey
      && target.selectionStart === 0
      && target.selectionEnd === 0) {
      event.preventDefault()
      const previous = focusPrevious(target)
      if (previous) {
        previous.setSelectionRange(previous.value.length, previous.value.length)
      }
    }
    if (event.key === 'ArrowRight'
      && !event.shiftKey
      && target.selectionStart === target.value.length
      && target.selectionEnd === target.value.length) {
      event.preventDefault()
      const next = focusNext(target)
      if (next) {
        next.setSelectionRange(0, 0)
      }
    }
  }

  const mask1: InputClusterParts[] = [
    {
      editor: {
        keyMap,
        onKeydown,
        placeholder: 'XXXX',
        validators: createFieldValidator([equalLengthValidator({base: 4})]),
        visibleWidth: '2.125rem',
      },
      type: TEXT_INPUT_TYPE_TEXT,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        keyMap,
        onKeydown,
        placeholder: 'XXXX',
        validators: createFieldValidator([equalLengthValidator({base: 4})]),
        visibleWidth: '2.125rem',
      },
      type: TEXT_INPUT_TYPE_TEXT,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        keyMap,
        onKeydown,
        placeholder: 'XXXX',
        validators: createFieldValidator([equalLengthValidator({base: 4})]),
        visibleWidth: '2.125rem',
      },
      type: TEXT_INPUT_TYPE_TEXT,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: '-'
    },
    {
      editor: {
        keyMap,
        onKeydown,
        placeholder: 'XXXX',
        validators: createFieldValidator([equalLengthValidator({base: 4})]),
        visibleWidth: '2.125rem',
      },
      type: TEXT_INPUT_TYPE_TEXT,
    },
    {
      editor: {
        borderless: true
      },
      type: TEXT_DISPLAY_TYPE_LITERAL,
      value: 'CVV'
    },
    {
      editor: {
        placeholder: 'CVV',
        validators: createFieldValidator([equalLengthValidator({base: 3})]),
        visibleWidth: '1.75rem',
      },
      type: TEXT_INPUT_TYPE_TEXT,
    },
  ]

</script>

<GridContainer class="demopage-grid">
  <GridLine>
    <span class="grid-span-6">Credit card:</span>
    <span class="grid-span-6">
      <form>
        <InputCluster
          mask={mask1}
          bind:value={boundValue} />
        {JSON.stringify(boundValue)}
      </form>
    </span>
  </GridLine>
  <GridLine>
    <span class="grid-span-3">Values to copy & paste:</span>
    <span class="grid-span-3">1234567812345678</span>
    <span class="grid-span-3">1234-5678-1234-5678</span>
    <span class="grid-span-3">1234 - 5678 - 1234 - 5678</span>
  </GridLine>
</GridContainer>