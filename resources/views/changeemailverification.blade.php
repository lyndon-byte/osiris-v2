@component('mail::message')

Hello {{ $name }}

Before we allow you to change your email address we must make sure that your new email address is valid

Kindly click the button to verify this new email address

@component('mail::button',['url' => $url])
    Verify Email Address
@endcomponent
    
@endcomponent