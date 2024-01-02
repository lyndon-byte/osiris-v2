<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewUserCredential extends Mailable
{
    use Queueable, SerializesModels;

    public $minusername;
    public $adminname;
    public $employee_id;
    public $miniuseremail;
    public $url;

    /**
     * Create a new message instance.
     */
    public function __construct($minusername,$adminname,$employee_id,$miniuseremail,$url)
    {
        $this->minusername = $minusername;
        $this->adminname = $adminname;
        $this->employee_id = $employee_id;
        $this->miniuseremail = $miniuseremail;
        $this->url = $url;

    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New User Credential',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'newminiusercredential',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
