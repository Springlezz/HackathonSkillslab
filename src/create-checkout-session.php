<?php
require 'vendor/autoload.php';

use Stripe\Stripe;
use Stripe\Checkout\Session;



\Stripe\Stripe::setApiKey('sk_test_51ROswmQoWqQ4g3iBvAtiMvKAhEWWMdWnihctDOIr4PStoJPv46b9QDvSdt3lNABMEhf0VY4Re1SMyAOqWLUcMaWn00oQOZZ3oQ');

$session = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'],
    'line_items' => [[
        'price_data' => [
            'currency' => 'usd',
            'product_data' => ['name' => 'Фильм'],-
            'unit_amount' => 100, // в центах
        ],
        'quantity' => 1,
    ]],
    'mode' => 'payment',
    'success_url' => 'https://yourdomain.com/success.html',
    'cancel_url' => 'https://yourdomain.com/cancel.html',
]);

echo json_encode(['sessionId' => $session->id]);