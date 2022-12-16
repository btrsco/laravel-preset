<?php

/**
 * Test home page features.
 */

it('has home page', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});